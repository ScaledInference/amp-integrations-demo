const Amp = require('amp-node');

const init = (config, req = null) => {
  const amp = new Amp(config);

  if (req === null) {
    amp.session = new amp.Session();
    console.log(amp.session.id);
  }
  else {
    const sessionid = req.cookies.__si_sid;
    const userid = req.cookies.__si_uid;
    if (sessionid === null || userid === null) {
      amp.session = new amp.Session();
      console.log(amp.session.id);
    } else {
      amp.session = new amp.Session({id: sessionid, userId: userid});
      console.log('Restoring session ' + amp.session.id);
    }
  }
  return amp;
};


const postHappy = (amp) => {
  console.log('Sending happiness to ' + amp.session.id + ' ' + amp.session.userId);
  amp.session.observe('Happiness', {});
};

const test = function(amp, req, isAjax) {
  const userTypes = ['child', 'adult'];
  const userType = userTypes[Math.round(Math.random())];
  const clientType = 'Node Server';

  console.log(req.headers.cookie);
  console.log('%j',req.body);

  // Observe Context: UserType
  amp.session.observe('UserType', { userType });
  amp.session.observe('ClientType', { clientType });

  // Send clientInfo only for Ajax requests
  // Demo purpose only. Nothing stops firstpage load to send Client information
  if (isAjax && req.body !== undefined) {
    console.log('Sending client info');
    const clientInfo = req.body;
    amp.session.observe('ClientInfo', { clientInfo  } );
  }

  // Decide Action: TextStyle
  const helloStyle = amp.session.decide('TextStyle', {
    textStyle: ['regular', 'fun', 'classic']
  });

  return helloStyle;
};

module.exports = {test, init, postHappy};
