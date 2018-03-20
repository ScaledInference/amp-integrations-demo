const firstPage = ({title, body, ctx}) => {
  return `
    <html>
    <head>
        <base href="/" />
        <title>Node Server First Page Request</title>
        <!--Stylesheet-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1> ${title} </h1>
        <div id="demo">
            Welcome to node server testing!!<br>
            ${title}<br>
            This tests first page load <br>

        </div>
        <div id="result" class="result">
        </div>

        <div class="btnContainer">
          <a class="back" href="/demos">&#8592; Back to Demo </a>
        </div>

        <div id="myModal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <p class="modal-text" id="modal-text">${body}</p>
            <button class="enroll" id="enroll">enroll</button>
            <button class="cancel" id="cancel">cancel</button>
          </div>
        </div>
        <script src="nodehelper.js"></script>
        <script>
          const myModal = document.getElementById('myModal');
          myModal.style.display = "block";
        </script>
    </body>
    </html>
  `;
};

module.exports = {firstPage};
