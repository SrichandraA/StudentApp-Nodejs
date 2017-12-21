var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileschema = new Schema({
    
     username:{
        type:String
            },
    name:{
        type:String    }
},{
    timestamps : true
});

var Profile=mongoose.model('profile',profileschema);
module.exports=Profile;