'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const config = require('./config.js');

const demoPkg = require('./middleware/demo.js');
const template = require('./middleware/template.js');
const clientTemplate = require('./middleware/clientTemplate');
const thickClientTemplate = require('./middleware/thickClientTemplate');
const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

//UA parser
app.use(useragent.express());

// Setup static pages
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', (req, res) => {
  res.redirect('/demos');
});

app.get('/demos', (req, res) => {
  res.sendFile(path.join(__dirname, './public/demo.html'));
});

app.post('/demo', (req, res) => {
  try {
    const demo = demoPkg.init(config, null);
    const text = demoPkg.test(demo, req, true);
    res.cookie('__si_sid',demo.session.id);
    res.cookie('__si_uid',demo.session.userId);
    res.end(JSON.stringify(text));
  } catch (e) {
    console.log(e);
    res.end('Exception asking for decision', e);
  }
});

app.post('/demo/success', (req, res) => {
  try {
    const demo = demoPkg.init(config, req);
    res.cookie('__si_sid',demo.session.id);
    res.cookie('__si_uid',demo.session.userId);

    demoPkg.postHappy(demo);
    res.end(JSON.stringify({'result':'Happiness posted'}));

  } catch(e) {
    console.log(e);
    res.end('Error occurred posting Happiness');
  }
});

// proposal one.
app.get('/demos/nodeThin', (req, res) => {
  try {
    const demo = demoPkg.init(config, null);
    const text = demoPkg.test(demo, req, false);
    res.cookie('__si_sid',demo.session.id);
    res.cookie('__si_uid',demo.session.userId);
    res.send(template.firstPage({
      body: 'Got a decision from server ' + text.textStyle,
      title: 'First Page Load',
      ctx: {
        'key': config.key,
        'domain': config.domain
      },
    }));
  } catch (e) {
    console.log(e);
    res.end('Exception on first page load, see server logs', e);
  }
});


// proposal 2
app.get('/demos/ajaxRequest', (req, res) => {
  res.sendFile(path.join(__dirname, './public/ajaxRequest.html'));
});

// proposal 3
app.get('/demos/ampBrowserThick', (req, res)=>{
  try{
    res.send(
      thickClientTemplate({
        title: 'Amp Browser Thick Demo',
        scriptPath: '../ampBrowserThickDemo.js',
        body: 'Got decision from thick client',
        ctx:{
          'userInfo':{
            'lang':'en',
            'country':'USA'
          },
          'templateInfo':{
            'name': 'china',
            'server': 'asia'
          }
        }
      })
    );
  }catch(e){
    console.log(e);
    res.end('Error occurred', e);
  }
});

// proposal 4
app.get('/demos/ampBrowserThin', (req, res) => {
  try {
    res.send(
      clientTemplate({
        title: 'Amp Browser Thin Demo',
        scriptPath: '../ampBrowserThinDemo.js',
        ctx: req.useragent,
        ampFlags: {
          'key': config.key,
          'domain': config.domain
        },
        body: 'Got decision from server'
      })
    );
  } catch (e) {
    console.log(e);
    res.end('Error occurred in Thin Browser', e);
  }
});

app.listen(config.port);
