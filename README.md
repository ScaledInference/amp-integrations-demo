# amp-integrations-demo

## Usage Instructions
### Install NPM and Node
> * sudo apt-get update
> * sudo apt-get install npm
> * sudo npm install -g n
> * sudo n latest

### Initialize a directory
> npm init

### Install the demo node package
> npm i --save amp-integrations-demo

### Add the shortcut to your package.json
Add the following to the scripts section of package.json
> "ampdemo" : "node node_modules/amp-integrations-demo/src/app.js"

### Run the demo
> npm run ampdemo key=<projectKey> domain=<amp-agent endpoint>

### View the demo on the browser
Use your favorite browser to visit http://localhost:5150
