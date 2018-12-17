const request = require('request-promise');
const Sequelize = require('sequelize');
const log4js = require('log4js');
const log = log4js.getLogger("CMS:Youtube");
const logLevel = config["LOG_LEVEL"];
log.setLevel(logLevel);

const AmsUtils = require('../utils/ams-utils');
const amsUtils = new AmsUtils();
const serviceChannelConfig = require('../config/service-channel-config');
const ArticleService = require('./article-service');
const Atom = require('../models').Atom;
const YoutubeUtils = require('../utils/youtube-utils');
const articleService = new ArticleService();
const serviceChannelList = serviceChannelConfig[process.env.NODE_ENV || 'development'].serviceChannelList;

const EMPTY_ARR_READ_ONLY = [];
const EMPTY_OBJ_READ_ONLY = {};

const CHANNEL_URL = 'https://www.googleapis.com/youtube/v3/channels';
const PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

const MAX_RETRIES_PER_CHANNEL = 3;
const MAX_RETRIES_PER_USER = 3;
const PAGE_SIZE = 50;
const PLATFORM_USER_ID = 69;

class YoutubeService {
  constructor() {
    this.name = 'YoutubeService';
    this.serviceIndex = 0;
    this.channelIndex = 0;
    this.userIndex = 0;
  }

  start() {
    this.startTime = Date.now();
    this.fetchData();
  }

  fetchData() {
    if (!serviceChannelList[this.serviceIndex]) {
      log.info('Job is done!');
      log.info(`Total Run Time: ${Date.now() - this.startTime}ms`);
      return;
    }

    this.numRetries = 0;
    const service = serviceChannelList[this.serviceIndex];
    const channels = service.channels;
    const channel = channels[this.channelIndex] || EMPTY_OBJ_READ_ONLY;
    const channelId = channel.channelId;
    const users = service.users;
    const user = users[this.userIndex] || EMPTY_OBJ_READ_ONLY;
    const username = user.username;

    if (channelId) {
      this.fetchChannelData(channelId);
    } else if (username) {
      this.fetchUserData(username);
    } else {
      this.serviceIndex += 1;
      this.fetchData();
    }
  }

  async fetchChannelData(channelId) {
    if (!channelId) { return; }

    let data;

    try {
      log.info('Fetching Data for channel', channelId);

      data = await request({
        url: CHANNEL_URL,
        qs: {
          id: channelId,
          key: config.YOUTUBE.KEY,
          part: ['contentDetails'].join(',')
        }
      });

    } catch (e) {
      log.error('Error fetching channel data', e.code, e.message);

      if (this.numRetries < MAX_RETRIES_PER_CHANNEL) {
        log.info('Retrying for channel', channelId);
        return this.fetchChannelData(channelId);
      } else {
        log.error('skipping channel:', channelId);

        this.numRetries = 0;
        this.channelIndex += 1;

        return this.fetchData();
      }
    }

    this.processChannelData(data);
  }

  async fetchUserData(username) {
    if (!username) { return; }

    try {
      log.info('Fetching Data for username', username);

      const data = await request({
        url: CHANNEL_URL,
        qs: {
          forUsername: username,
          key: config.YOUTUBE.KEY,
          part: ['contentDetails'].join(',')
        }
      });

      this.numRetries = 0;
      this.processUserData(data);
    } catch (e) {
      log.error('Error fetching user data', e.code, e.message);

      if (this.numRetries < MAX_RETRIES_PER_USER) {
        log.info('Retrying for username', username);
        this.fetchUserData(username);
      } else {
        this.userIndex += 1;
      }
    }
  }

  processChannelData(response) {
    try {
      const data = JSON.parse(response);
      const items = data.items || EMPTY_ARR_READ_ONLY;

      if (!items.length) {
        this.channelIndex += 1;
        return;
      }

      const channelData = items[0];
      const {contentDetails: { relatedPlaylists: { uploads: playlistId }}} = channelData;

      this.fetchPlaylistData({
        playlistId,
        isChannel: true,
      });
    } catch (e) {
      log.error('error parsing channel response', response);
    }
  }

  processUserData(response) {
    try {
      const data = JSON.parse(response);
      const items = data.items || EMPTY_ARR_READ_ONLY;

      if (!items.length) {
        this.userIndex += 1;
        return;
      }

      const userData = items[0];
      const {contentDetails: { relatedPlaylists: { uploads: playlistId }}} = userData;

      this.fetchPlaylistData({
        playlistId, isChannel: false
      });
    } catch (e) {
      log.error('error parsing channel response', response);
    }
  }

  async fetchPlaylistData({playlistId, pageToken, isChannel}) {
    log.info('fetching data for playlistId', playlistId, pageToken);

    try {
      const response = await request({
        url: PLAYLIST_URL,
        qs: {
          playlistId,
          key: config.YOUTUBE.KEY,
          part: ['snippet'].join(','),
          maxResults: PAGE_SIZE,
          pageToken,
        }
      });

      this.processPlaylistData({
        playlistId, response, isChannel
      });
    } catch (e) {
      log.error('error fetching playlist data', playlistId, e.code, e.message);
    }
  }

  async processPlaylistData({playlistId, response, isChannel}) {
    try {
      const playlistData = JSON.parse(response);
      const {items, pageInfo, nextPageToken} = playlistData;
      const result = await this.getDuplicateItems(items);
      const duplicateItemUrls = result.map(item => item.dataValues.destUrl);
      log.info('total duplicate items', duplicateItemUrls.length);

      const filteredItems = items.filter(item => {
        const videoUrl = YoutubeUtils.getVideoURLForItem(item);

        return !duplicateItemUrls.includes(videoUrl);
      });

      this.processItems(({items: filteredItems, playlistId, nextPageToken, isChannel}));
    } catch(e) {
      log.error('error parsing playlist response', e);
    }
  }

  async getDuplicateItems(items) {
    const videoUrls = [];

    items.forEach(item => {
      videoUrls.push(YoutubeUtils.getVideoURLForItem(item));
    });

    return Atom.findAll({
      where: {
        destUrl: {
          $or: videoUrls
        }
      }
    });
  }

  async processItems({items, playlistId, nextPageToken, isChannel}) {
    log.info('processing items in bulk');

    for (const item of items) {
      try {
        await this.processItem(item);
      } catch (e) {
        log.error('error while processing item', item.id, e.code, e.message);
      }
    }

    log.info('done processing items');

    if (nextPageToken) {
      this.fetchPlaylistData({playlistId, pageToken: nextPageToken, isChannel});
    } else {
      log.info('Done parsing playlist id', playlistId);

      if (isChannel) {
        this.channelIndex += 1;
      } else {
        this.userIndex += 1;
      }

      this.fetchData();
    }
  }

  async processItem(item) {
    log.info('processing item', item.id);
    log.debug('processing item', item);

    const {snippet: { thumbnails, title, description, publishedAt, resourceId: { videoId }}} = item;
    const itemThumbnail = thumbnails.high.url;
    let assetId;

    try {
      log.debug('getting asset for itemThumbnail', itemThumbnail);
      const response = await amsUtils.getAssetFromLink(itemThumbnail);
      // const response = {assetId: 'some-asset-id'};
      assetId = response.assetId;
      log.info('got asset id from AMS', assetId);
    } catch (e) {
      log.error('Error while uploading to AMS', itemThumbnail, e.message, e.code);
    }

    return this.createArticle(item, assetId);
  }

  async createArticle(item, assetId) {
    const {snippet: { thumbnails, title, description, publishedAt, resourceId: { videoId }}} = item;
    const service = serviceChannelList[this.serviceIndex];

    const payload = {
      userId: PLATFORM_USER_ID,
      serviceUid: service.serviceId,
      caption: title,
      category: 'Humor',
      subCategory: 'Others',
      cover: {
        type: 'NORMAL',
        items: [{
          content: {
            assetId,
            format: 'jpg'
          },
          type: 'IMAGE'
        }]
      },
      post: {
        type: 'NORMAL',
        items: [{
          content: {
            srcUrl: YoutubeUtils.getVideoURLForId(videoId),
          },
          type: 'URL'
        }]
      }
    };

    log.info('calling create article for video and asset:', videoId, assetId);
    log.debug('payload for API', JSON.stringify(payload));

    return new Promise((resolve, reject) => { // Since the internal implementation of create takes a callback for now.
      // setTimeout(resolve, 100);
      articleService.create(payload, (err, result) => {
        log.info('got final callback', err, result);

        if (err) {
          log.error('error creating article', err);
          reject(err);
        } else {
          log.info('success creating article');
          log.debug('success creating article:', result);
          resolve(result);
        }
      })
    });
  }
}

module.exports = YoutubeService;