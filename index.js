var express = require('express');
var moment = require('moment');
var app = express();
const getDate = (()=> {
  let myDate =  moment().add(Math.floor(Math.random() * 60) + 30,'second');
  return ()=> {
      if(myDate.isSameOrBefore(moment())){
          myDate =  moment().add(Math.floor(Math.random() * 60) + 30,'second');
          console.log("We have a new Date dude!");
      }
      return myDate;
  }
})();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRndDate', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({date:getDate().format()}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});