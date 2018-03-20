
const xhttp = new XMLHttpRequest();


const loadDoc = function() {
  xhttp.open('POST', '/demo', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({'extra':'dummy'}));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const modal = document.getElementById('myModal');
      const result = JSON.parse(this.responseText);
      modal.style.display = 'block';
      document.getElementById('modal-text').innerText = 
          document.getElementById('modal-text').innerText + ': ' + result.textStyle;
    }
  };
};

const modal = document.getElementById('myModal');
modal.style.display = 'none';

const cancelFn = function() {
  modal.style.display = 'none';
  document.getElementById('result').innerText = ' Enrollment cancelled. Nothing sent to server';
};

window.onclick = function(event) {
  if (event.target == modal) {
    cancelFn();
  }
};

const span = document.getElementsByClassName('close')[0];
const cancel = document.getElementsByClassName('cancel')[0];
span.onclick = cancel.onclick = cancelFn;

const enroll = document.getElementById('enroll');
enroll.onclick = function() {
  // Sending a success to the backend
  xhttp.open('POST', '/demo/success', true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const modal = document.getElementById('myModal');
      const result = this.responseText;
      modal.style.display = 'none';
      document.getElementById('result').innerText = ' Posted Happiness to server: ' + result;
    }
  };
};
