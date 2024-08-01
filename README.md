[![Node.js Package](https://github.com/gcloudan/devops/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/gcloudan/devops/actions/workflows/npm-publish-github-packages.yml)

## Prerequisites
1. Requires Node.js > v14.18.0
1. export MONGODB_VERSION=6.0-ubi8
1. docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:$MONGODB_VERSION


## Analysis
Root Problem:
1. Laptop build and deploy.
1. Concentration risk on 1 laptop and 1 person.
1. Not containerised, works on 1 laptop and risk of it not working on other computers due to specific toolchain used.
1. Lack of testing and lack of visibility of testing.
1. Lack of version control and lack of artifact control.
1. Lack of ability to work with many people on same project.

## Goals
1. Automated CI/CD with GitHub Action pipelines.
1. MongoDB as noSQL database to be hosted locally for testing and integrated for local testing.
1. MongoDB and app to be hosted and integrated in production.


