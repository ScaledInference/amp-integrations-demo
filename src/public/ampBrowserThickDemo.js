var decision;
(function(){
  try{
    const config = window.ampConfig;
    const initialContext = config.initialObservingContext || {};
    Object.entries(initialContext).forEach(([key, value]) => {
      amp.observe(key, value);
      console.log('Observe request for event %s is sent with properties %s', key,JSON.stringify(value));

      decision = amp.decide("ButtonColor", { color: ["blue", "orange", "green"] });
      console.log('Decision made: %s', decision.color);
    });
  }catch(err){
    console.log(err);
  }
})();

const myModal = document.getElementById('myModal');
        myModal.style.display = "block";
        document.getElementById('modal-text').innerText += ': ' + JSON.stringify(decision);