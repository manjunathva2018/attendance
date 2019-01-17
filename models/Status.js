var mongoose=require('mongoose');
//schema
var statusSchema=new mongoose.Schema({
    date:Date,
    userName:String,
    status:String,
    message:String
});
// compile schema to model
module.exports=mongoose.model('Status',statusSchema,'attendStatus');