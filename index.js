const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use('/',require('./routes'));
  
app.listen(port, async function () {
  console.log(`Dashboard app listening on port ${port}!`);

});