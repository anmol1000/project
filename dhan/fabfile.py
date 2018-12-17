import datetime
import sys
import os
import requests
import json
from fabric.api import *
from google.cloud import storage


env.app_name = 'creator'
env.app_directory = './*'
env.remote_root = 'content'
env.bucket_name = 'platform-repository'

env.role = 'creator'
env.repo  = 'creator'

env.gcp_url = "http://devops-handler.hike.in:3000/rolling-action-handler"
env.instance_groups = {
    "creator": ["content-creator"]
}

def prod():
   env.envrn= 'prod'

def stage():
   env.envrn = 'qa'


def set_gcs_connection(GCP_CREDS_FILE="deploy/client_secret.json"):
   if os.path.isfile(GCP_CREDS_FILE):
       print "GCP_CREDS_FILE found:%s" % GCP_CREDS_FILE
       os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = GCP_CREDS_FILE
   else:
       print "Error: GCP_CREDS_FILE not found:%s" % GCP_CREDS_FILE
       sys.exit(-1)
   return storage.Client()



def upload_blob(storage_client, bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket. GCS Credentials must be set before calling this method."""

    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))



def build():
    env.tar_file_name = '%s_%s.tar.gz' % (env.app_name, '{:%Y-%m-%d_%H%M%S}'.format(datetime.datetime.now()))
    local('tar -czf %(tar_file_name)s  %(app_directory)s ' %env)


def deploy():
    storage_client = set_gcs_connection()
    destination_blob_name = env.remote_root + "/" + env.role + "/" + env.tar_file_name
    upload_blob(storage_client, env.bucket_name, env.tar_file_name, destination_blob_name)
    trigger_gcp_deploy()
    local('rm %(tar_file_name)s' %env)

def trigger_gcp_deploy(action="redeploy"):
    data = {"instance_groups": env.instance_groups[env.repo], "action": "redeploy", "project":"platform-hike", "max_surge":1 ,"max_unavailable":1 , "minimum_wait_time":"1"}
    headers = {"Content-Type": "application/json"}
    r = requests.post(url=env.gcp_url, data=json.dumps(data), headers=headers)
    if r.status_code == 200:
        response = r.json()
        print "GCS Deploy call - Status: %s Message: %s" % (response["status"], response["message"])
    else:
        print "Error - Response=%s %s" % (r, r.text)


def all():
    build()
    deploy()
