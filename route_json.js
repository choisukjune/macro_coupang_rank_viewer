var express = require('express');
var path = require( 'path' );
var fs = require( "fs" );
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/*.json', function(req, res){
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )
	debugger;
	// var targetDate = req.params[0].split("_")[0];
	// var fileNm00 = req.params[0]
	// JsonToHtml( fileNm00, function(data){
		res.sendFile(path.join(__dirname + "/html/" + decodeURI(fileNm) ));
	// })
	
})

router.get('/', function(req, res){
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )

	var a = fs.readdirSync( "./json/" ).reverse();

	res.statusCode = 200;
	res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
	res.setHeader( "Access-Control-Allow-Origin", "*" );
	res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
	
	res.json( a );
	
})

router.get('/:keyword', function(req, res){
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )

	var a = fs.readdirSync( "./json/" + req.params.keyword + "/" ).reverse();

	res.statusCode = 200;
	res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
	res.setHeader( "Access-Control-Allow-Origin", "*" );
	res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
	
	res.json( a );
	
})

router.get('/:keyword/:date', function(req, res){
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )

	var a = fs.readdirSync( "./json/" + req.params.keyword + "/" + req.params.date + "/").reverse();

	res.statusCode = 200;
	res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
	res.setHeader( "Access-Control-Allow-Origin", "*" );
	res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
	
	res.json( a );
	
})

router.get('/:keyword/:date/:fileNm', function(req, res){
	var fileNm = req.path;
	console.log( Date.now() + " -- " + req.ip + " - " + fileNm )

	var a = fs.readFileSync( "./json/" + req.params.keyword + "/" + req.params.date + "/" + req.params.fileNm + ".json" ).toString();
	var o = JSON.parse( a )
	res.statusCode = 200;
	res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
	res.setHeader( "Access-Control-Allow-Origin", "*" );
	res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
	
	res.json( o );
	
})

router.get('/getFileCount', function(req, res){
	var a = fs.readdirSync( "./html/" ).reverse();
	res.send( a )
})

module.exports = router;