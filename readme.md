## Install Docker
https://docs.docker.com/install/

## Setup
1. Clone repository
`git clone https://github.com/Scout-19/scout-19`

2. Build Docker Container
`docker-compose build`

3. Startup Container Background
`docker-compose up -d`

4. Execute 'sh' in 'node' Container
`docker-compose exec nodejs sh`

5. Install Node Packages
`cd web && yarn install`

6. Launch Vue.js
`yarn serve`

## Visual Studio Code
1. Install 'Remote - Containers' Extention

2. 'Remote-Containers: Open Folder in Container...'


