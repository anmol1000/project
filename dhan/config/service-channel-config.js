/**
 * [serviceChannelConfig Configuration for YouTube channels and users to be imported]
 * serviceId: service to upload the imported articles to
 * channel: [
 *  name: Channel Name for reference
 *  channelId: Channel Id used in import
 * ],
 * users: [
 * name: User Name for reference
 * username: Actual username used in YouTube's API to filter content
 * ]
 *
 */

const serviceChannelConfig = {
  development: {
    serviceChannelList: [{
      serviceId: '65c7381aad6d894f5e0f1bf19e0121dd',
      channels: [{
        name: 'Hasley India',
        channelId: 'UCgM1AQcoM5TRlzsm1e66vrQ',
      }],
      users: [{
        name: 'Funk You',
        username: 'funkyouentertainment',
      }]
    }],
  },
  staging: {
    serviceChannelList: [{
      serviceId: '65c7381aad6d894f5e0f1bf19e0121dd',
      channels: [{
        name: 'Hasley India',
        channelId: 'UCgM1AQcoM5TRlzsm1e66vrQ',
      }, {
        name: 'Hasley India comedy',
        channelId: 'UCIiKT-slg6F_NNG-9GcmWIw',
      }, {
        name: 'LShokeen Films',
        channelId: 'UCsLOXfgwzeLAl9E-6Flu3Bg',
      }, {
        name: 'BB Ki Vines',
        channelId: 'UCqwUrj10mAEsqezcItqvwEw',
      }, {
        name: 'Girlyapa',
        channelId: 'UCdxbhKxr8pyWTx1ExCSmJRw'
      }, {
        name: 'GT films',
        channelId: 'UCh-shEucQs1chaoZI-SFyIw'
      }, {
        name: 'Elvish Yadav',
        channelId: 'UCbmu9wfzxKls40WkCzvqtRA'
      }, {
        name: 'Amit Bhadana',
        channelId: 'UC_vcKmg67vjMP7ciLnSxSHQ'
      }, {
        name: 'Aashqeen',
        channelId: 'UCc3b8uaQNySMagDbHsm52Tg'
      }, {
        name: 'Baklol',
        channelId: 'UCQfE97UMDGgKCFb7iGM8Btg'
      }, {
        name: 'KHANDESHI MOVIES',
        channelId: 'UCP84QWij0alw4MvzqzyfOnw'
      }, {
        name: 'Idiotic sperms',
        channelId: 'UCfl3JMUeTNq0wxeDYJKKneg'
      }, {
        name: 'Mr Reporter',
        channelId: 'UCZyfMdM8fukBBxQvAwgTf5A'
      }, {
        name: 'Bollywood pe Charcha',
        channelId: 'UC4Eb9Ei-bR8MeQTG2pkwiZw'
      }, {
        name: 'Halchal in Bollywood',
        channelId: 'UCrt8HM8JV9gF-YomS-IDvrg'
      }, {
        name: 'Home Bollywud',
        channelId: 'UCfyKktpUgdV5xDEhakicCsw'
      }, {
        name: 'Univrsal Media Pro',
        channelId: 'UCWi865tyDtqp36B1gPAT0ig'
      }, {
        name: 'Offscreen Of Stars',
        channelId: 'UC0UVvqXaH4k2NFkQ2_44Ghw'
      }, {
        name: 'Pinkvilla',
        channelId: 'UCkJZQddO3XTCdcLjN019FjA'
      }, {
        name: 'The Screen Patti',
        channelId: 'UCNyeSfUfffmJXwA2_tmNG9A'
      }, {
        name: 'Rishhome',
        channelId: 'UCz6l7YPnfyxvbVD7LVuNEow'
      }, {
        name: 'Angry Prash',
        channelId: 'UCz-iDa_Z-GWaZ_YweEus6iw'
      }, {
        name: 'Harsh Beniwal',
        channelId: 'UCVmEbEQUGXHVm-O9pqa3JWg'
      }, {
        name: 'realSHIT',
        channelId: 'UCsSZyyGKf9FdpqDmynjVBcA'
      }, {
        name: 'Filter Copy',
        channelId: 'UC7IMq6lLHbptAnSucW1pClA'
      }, {
        name: 'Bhatt Why',
        channelId: 'UC_IxNdQk0hLiUxmoCxGR_wg'
      }],
      users: [{
        name: 'Funk You',
        username: 'funkyouentertainment',
      }, {
        name: 'Best in Bollywood',
        username: 'bestinbollywood'
      }, {
        name: 'Sony live',
        username: 'setindia'
      }, {
        name: 'Largeshortfilms',
        username: 'LargeShortFilms'
      }, {
        name: 'Film Companion',
        username: 'TheFIlmCompanion'
      }, {
        name: 'Zoom',
        username: 'ZoomDekho'
      }, {
        name: 'Bollywood Mirchii',
        username: 'BollywoodMirchii'
      }, {
        name: 'MissMalini',
        username: 'missmalinivideos'
      }, {
        name: 'SpotboyE',
        username: '9XETheShow'
      }, {
        name: 'Filmfare',
        username: 'Filmfareweb'
      }, {
        name: 'Sahibnoor Singh',
        username: 'SahibProductions'
      }, {
        name: 'Rickshawali',
        username: 'rickshawali'
      }, {
        name: 'The Viral Fever',
        username: 'TheViralFeverVideos'
      }, {
        name: 'Love Rudrakash',
        username: 'ranilovejoti'
      }, {
        name: 'Be youNick',
        username: 'beyounick'
      }, {
        name: 'The Timeliners',
        username: 'SorteddTV'
      },]
    }],
  },
  production: {
    serviceChannelList: [{
      serviceId: '65c7381aad6d894f5e0f1bf19e0121dd',
      channels: [{
        name: 'Hasley India',
        channelId: 'UCgM1AQcoM5TRlzsm1e66vrQ',
      }, {
        name: 'Hasley India comedy',
        channelId: 'UCIiKT-slg6F_NNG-9GcmWIw',
      }, {
        name: 'LShokeen Films',
        channelId: 'UCsLOXfgwzeLAl9E-6Flu3Bg',
      }, {
        name: 'BB Ki Vines',
        channelId: 'UCqwUrj10mAEsqezcItqvwEw',
      }, {
        name: 'Girlyapa',
        channelId: 'UCdxbhKxr8pyWTx1ExCSmJRw'
      }, {
        name: 'GT films',
        channelId: 'UCh-shEucQs1chaoZI-SFyIw'
      }, {
        name: 'Elvish Yadav',
        channelId: 'UCbmu9wfzxKls40WkCzvqtRA'
      }, {
        name: 'Amit Bhadana',
        channelId: 'UC_vcKmg67vjMP7ciLnSxSHQ'
      }, {
        name: 'Aashqeen',
        channelId: 'UCc3b8uaQNySMagDbHsm52Tg'
      }, {
        name: 'Baklol',
        channelId: 'UCQfE97UMDGgKCFb7iGM8Btg'
      }, {
        name: 'KHANDESHI MOVIES',
        channelId: 'UCP84QWij0alw4MvzqzyfOnw'
      }, {
        name: 'Idiotic sperms',
        channelId: 'UCfl3JMUeTNq0wxeDYJKKneg'
      }, {
        name: 'Mr Reporter',
        channelId: 'UCZyfMdM8fukBBxQvAwgTf5A'
      }, {
        name: 'Bollywood pe Charcha',
        channelId: 'UC4Eb9Ei-bR8MeQTG2pkwiZw'
      }, {
        name: 'Halchal in Bollywood',
        channelId: 'UCrt8HM8JV9gF-YomS-IDvrg'
      }, {
        name: 'Home Bollywud',
        channelId: 'UCfyKktpUgdV5xDEhakicCsw'
      }, {
        name: 'Univrsal Media Pro',
        channelId: 'UCWi865tyDtqp36B1gPAT0ig'
      }, {
        name: 'Offscreen Of Stars',
        channelId: 'UC0UVvqXaH4k2NFkQ2_44Ghw'
      }, {
        name: 'Pinkvilla',
        channelId: 'UCkJZQddO3XTCdcLjN019FjA'
      }, {
        name: 'The Screen Patti',
        channelId: 'UCNyeSfUfffmJXwA2_tmNG9A'
      }, {
        name: 'Rishhome',
        channelId: 'UCz6l7YPnfyxvbVD7LVuNEow'
      }, {
        name: 'Angry Prash',
        channelId: 'UCz-iDa_Z-GWaZ_YweEus6iw'
      }, {
        name: 'Harsh Beniwal',
        channelId: 'UCVmEbEQUGXHVm-O9pqa3JWg'
      }, {
        name: 'realSHIT',
        channelId: 'UCsSZyyGKf9FdpqDmynjVBcA'
      }, {
        name: 'Filter Copy',
        channelId: 'UC7IMq6lLHbptAnSucW1pClA'
      }, {
        name: 'Bhatt Why',
        channelId: 'UC_IxNdQk0hLiUxmoCxGR_wg'
      }],
      users: [{
        name: 'Funk You',
        username: 'funkyouentertainment',
      }, {
        name: 'Best in Bollywood',
        username: 'bestinbollywood'
      }, {
        name: 'Sony live',
        username: 'setindia'
      }, {
        name: 'Largeshortfilms',
        username: 'LargeShortFilms'
      }, {
        name: 'Film Companion',
        username: 'TheFIlmCompanion'
      }, {
        name: 'Zoom',
        username: 'ZoomDekho'
      }, {
        name: 'Bollywood Mirchii',
        username: 'BollywoodMirchii'
      }, {
        name: 'MissMalini',
        username: 'missmalinivideos'
      }, {
        name: 'SpotboyE',
        username: '9XETheShow'
      }, {
        name: 'Filmfare',
        username: 'Filmfareweb'
      }, {
        name: 'Sahibnoor Singh',
        username: 'SahibProductions'
      }, {
        name: 'Rickshawali',
        username: 'rickshawali'
      }, {
        name: 'The Viral Fever',
        username: 'TheViralFeverVideos'
      }, {
        name: 'Love Rudrakash',
        username: 'ranilovejoti'
      }, {
        name: 'Be youNick',
        username: 'beyounick'
      }, {
        name: 'The Timeliners',
        username: 'SorteddTV'
      },]
    }]
  }
}

module.exports = serviceChannelConfig;