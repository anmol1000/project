from fabric.api import *
from fabric.contrib import *
from fabric.operations import run, put
from fabric.context_managers import cd

import smtplib
from email.mime.text import MIMEText
import subprocess
import sys
import time
import urllib
import socket
import getpass

def write_version():
    local("mkdir -p deploy/")
    local("rm -f deploy/info")
    local("whoami >> deploy/info")
    local("date >> deploy/info")
    local("git branch -v | grep ^* >> deploy/info")
    local("git log --pretty=oneline --abbrev-commit -n 50 >> deploy/info")
    env.build_info = "hello"

def checkappdirectory():
    require("app_directory", provided_by=("staging", "prod"))

def stage():
    env.hosts = ['deploy@10.20.2.9']
    env.app_directory = "/var/opt/platform/cms"
    env.bower_directory = "/var/opt/platform/cms/public"
    env.role = "export NODE_ENV=staging"
    env.filename = "./"
    env.remotefile = "%s/" %env.app_directory
    env.install_package = "sudo npm install " 
    env.install_bower = "bower install --allow-root"
    env.stopcmd = "sudo supervisorctl stop hike-content:cms-node-01"
    env.restartcmd = "sudo supervisorctl restart hike-content:cms-node-01"

def prod():
    env.hosts = ['deploy@10.0.8.123','deploy@10.0.3.176']
    env.app_directory = "/var/opt/platform/cms"
    env.bower_directory = "/var/opt/platform/cms/public"
    env.role = "export NODE_ENV=production"
    env.filename = "./"
    env.remotefile = "%s/" %env.app_directory
    env.install_package = "sudo npm install"
    env.install_bower = "bower install --allow-root"
    env.stopcmd = "sudo supervisorctl stop cms:cms-01"
    env.restartcmd = "sudo supervisorctl restart cms:cms-01"

def deploy():
    checkappdirectory()
    project.rsync_project(local_dir=env.filename, remote_dir=env.remotefile,exclude=["node_modules","fabfile.*","bower_components","cms_sql"])

def stop():
    with cd(env.app_directory):
        run(env.stopcmd)

def restart():
    with cd(env.app_directory):
        run(env.role)
	run(env.restartcmd)

def install_package():
    with cd(env.app_directory):
        run(env.install_package)

def install_bower():
    with cd(env.bower_directory):
	run(env.install_bower)

def all():
    deploy()
    install_package()
    install_bower()
    restart()
