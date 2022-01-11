//-----------------------------------------------------------------;
// REQUIRES;
//-----------------------------------------------------------------;
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var express = require('express')
var path = require( 'path' )
var http = require( 'http' )
var WebSocket = require( "ws" )
var bodyParser = require('body-parser'); // body-parser 
var fs = require( "fs" );
//-----------------------------------------------------------------;
// REQUIRES;
//-----------------------------------------------------------------;
var app = express()
var port = 3000

var html_serving = require('./route_html');
var json_serving = require('./route_json');


app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());

app.use('/html', html_serving);
app.use('/json', json_serving);

app.get('/', function(req, res){
	
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )

//	var arr = fs.readdirSync("./html/")
//	var _t_html = fs.readFileSync("index.thtml").toString()
//		t_html = _t_html.replace( "<!=KEYWORD_LIST=!>", JSON.stringify( arr, null, 4 ) )
//	fs.writeFileSync( "index.html", t_html, {flag:"w"});
	res.sendFile(path.join(__dirname + '/index.html'));

})


var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
	var r  = {
		type : "message"
		, data : "websocket Connected!"
	}
	
	ws.send( JSON.stringify(r) );
	app.locals.clients = wss.clients;
	ws.on('close', function () {
	  console.log('stopping client interval');
	});
});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});