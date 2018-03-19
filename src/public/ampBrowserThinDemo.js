
(function () {
  try {
    const amp = new Amp(ampConfig.flags);
    const session = new amp.Session();
    var resultStr = '';

    // send observe with user information
    const initialContext = ampConfig.initialObservingContext || {};
    session.observe('userAgent', initialContext, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        //console.log(ampCtx);
        //console.log('User agent observed from Server');
        //console.log(res);
      }
    });

    var userInfo = {lang: 'en', country: 'USA'};
    session.observe('userInfo', userInfo, function(err) {
      if (err) {
        console.log(err);
      } else {
        //console.log('UserInfo Observe request sent! '+ JSON.stringify(userInfo));
        document.getElementById('result').innerText += ' Client sent userInfo: ' + JSON.stringify(userInfo);
      }
    });
    
    // send decide on which color / font template you want to use
    session.decide('Template', [
      {color: 'red', font: 'bold'},
      {color: 'red', font: 'italic'},
      {color: 'green', font: 'bold'},
      {color: 'green', font: 'italic'}
    ], function(err, decision) {
      if (err) {
        //console.log(err);
      } else {
        //console.log('Template Decide request sent!');
        //console.log('Decision made:', decision);
        const myModal = document.getElementById('myModal');
        myModal.style.display = "block";
        document.getElementById('modal-text').innerText += ': ' + JSON.stringify(decision);
      }
    });
  } catch (err) {
    console.log(err);
  }

})();
