var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql=require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
// Retrieve
var config=require('./config');
var con =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"riktam"

});
con.connect(function(err){
  if (err) throw err;
  console.log("connected");
  
 //   res.render('table',{page_title:"fdfd0",data})
//var sql="insert into table1(name,section) values('hig','go')";

});

/*con.query("insert into table1(name,section,email,phone) values('hig','go','fs','66')",function(err,res){
if(err) throw err;
console.log('1rec');

});*/
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/first',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);
res.writeHead(200,{'Content-Type':'text/html'})
res.write("<html><body><p>'result'</p></body></html>");


});

});
app.get('/second',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);

res.send(result);

});

});
app.get('/pagination/:id',function(req,res){
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=req.params.id;
	res.render('pagination',{students:result,currentPage:page});
});
});
app.get('/third',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);

res.render('main',{users: result});
});

});

app.get('/page',function(req,res){
  res.sendFile('/testingnode/routes/page.html');
});

app.get('/test',function(req,res){
  res.render('test');
});
app.post('/editpage',urlencodedParser, function(req,res){

console.log(req.body.val);
let vol={name:req.body.val};
let sql='select * from table1 where ?';
//let val=req.body.val;
con.query(sql,vol,function(err,result){
if(err) throw err;
//res.send(result);
res.render('test',{users: result});

});

});
app.get('/register',function(req,res){
  res.sendFile('/t/testingnode/routes/register.html');

	
});
app.post('/save',urlencodedParser, function(req,res){
  console.log(req.body.name);
  let newname=req.body.name;
  let post={name:req.body.name, section:req.body.section, email:req.body.email ,phone:req.body.phone};
  let sql='insert into table1 SET ?';
  con.query(sql,post,function(err,result){
if(err) throw err;
con.query("select * from table1",function(err,result){
if(err) throw err;

res.render('main',{users: result});
});
});
});

app.post('/save1',urlencodedParser, function(req,res){

  let post={name:req.body.name};
  	let sql='select name from table1 where ?';
  	con.query(sql,post,function(err,result){
  		if(err) throw err;

  		if(result.length < 1 ){
  			 let post={name:req.body.name, section:req.body.section, email:req.body.email ,phone:req.body.phone};
  let sql='insert into table1 SET ?';
  con.query(sql,post,function(err,result){
if(err) throw err;
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page});
});
});


  		}
  		else{
  		  			res.render('exist');

  		}
  	});

});

app.post('/dell',urlencodedParser,function(req,res){

	let post={name:req.body.val};
	let sql='DELETE from table1 where ?';
	con.query(sql,post,function(err,result){
		if(err) throw err;
	con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page});
});
	});

});
app.post('/update',urlencodedParser, function(req,res){

	let post=[{section:req.body.section, email:req.body.email, phone:req.body.phone},{name:req.body.name}];
	let sql="update table1 set ? where ?";
	con.query(sql,post,function(err,result){
		if(err)throw err;
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page});
});
	});

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
