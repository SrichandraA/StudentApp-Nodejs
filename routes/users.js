var express=require('express');
var bodyParser=require('body-parser');

var pschema=require('../models/schema');

var router=express.Router();
router.use(bodyParser.json());

router.route('/')

.get(function(req,res,next){
    
    pschema.find({},function(err,pro){
        if(err) throw err;
        console.log('profiles are');
        res.send(pro);
    });
})
.post(function(req,res,next){
    
    pschema.create(req.body,function(err,pro){
        
        if(err) throw err;
        var id=pro._id;
        //res.writeHead(200,{'Content-type':'text/plain'});
        res.json(pro);
    });
});

module.exports=router;