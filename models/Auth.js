var mongoose=require('mongoose');
//schema
var authSchema=new mongoose.Schema({
   userName:String,
   password:String
});
// compile schema to model
module.exports=mongoose.model('Auth',authSchema,'Authenticate');