const clientTemplate = ({title, body, ctx}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
	<meta charset="utf-8">
      <!--Stylesheet-->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
      <script type="text/javascript" src="../amp.min.js"></script>
      <link rel="stylesheet" href="../style.css">
  </head>
  <body>
    <h1>${title}</h1>
    <h3>Please open the console to see the result</h3>

    <div id="demo">
        Welcome to node client testing!!<br>
        ${title}<br>
        This tests browser thick client<br>

    </div>
    <div id="result" class="result">
    The server filled in ${JSON.stringify(ctx)}
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
    <script src="../nodehelper.js"></script>
    <script>
      window.ampConfig={
            builtinEvents:['AmpSession'],
            initialObservingContext:${JSON.stringify(ctx)}
      }
    </script>
  </body>
  <script type="text/javascript" src="https://amp.ai/libs/b234025df2e86c76.js"></script>
  <script src=../ampBrowserThickDemo.js></script>
</html>
`;

module.exports = clientTemplate;