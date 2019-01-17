var http=require('http');
var express=require('express');
var fs=require('fs');

var app=express();
var path=require('path');

var mongoose=require('mongoose');
var Auth=require('./models/Auth');
var Status=require('./models/Status');

mongoose.connect('mongodb://localhost/Attendance');
//mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!')
});



app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.post('/api/login',function(req,res){
 var uName=req.query.userName;
  var pass=req.query.password;
  
  Auth.find({"userName":uName,"password":pass},function(err,user){
      if(err)throw err;
      var object={};
      object.result=false;
      object.userName=null;
      if(user!=undefined && user!=null){
      for(var i=0;i<user.length;i++)
      {
        if(uName==user[i].userName && pass==user[i].password)
        { 
            console.log("User Name=%s",user[i].userName);
            object.result=true;
            object.userName=user[i].userName;
        }
      }
    }
    res.send(JSON.stringify(object));
  });
})

app.get('/api/getuser',function(req,res){
    var uName=req.query.userName;
   
    Auth.find({},function(err,user){
         if(err)throw err;
         var object={};
         object.result=false;
         object.userName=null;
         if(user!=undefined && user!=null){
         for(var i=0;i<user.length;i++){
            
             if(uName==user[i].userName){
                
            object.result=true;
            object.userName=user[i].userName;
             }
         }
        }
       
       res.send(JSON.stringify(object));
     });
   })

   app.post('/api/adduser',function(req,res){
       var uName=req.query.userName;
       var pass=req.query.password;
       var object={};
       object.result=false;
      if(uName!=undefined && pass!=undefined){
          // a document instance
          var addUser=new Auth({"userName":uName,"password":pass});
           // save model to database
           addUser.save(function(err,user){
            if(err) throw err;
            console.log("Saved user into DB",user);
        });
        object.result=true;
      }
      res.send(JSON.stringify(object));
   })

app.get('/Dashboard',function(req,res){
    res.sendFile(path.join(__dirname+'/public/views/Dashboard.html'));
})

app.post('/api/substatus',function(req,res){
    var uName=req.query.userName;
    var status=req.query.status;
    var message=req.query.message;
    var date=req.query.date;
    var object={};  
    object.result=false;
    console.log(uName,status,message,date);
    if(uName!=undefined && status!=undefined && message!=undefined && date!=undefined)
    { 
     
        // a document instance
        var saveStatus=new Status({"date":date,"userName":uName,"status":status,"message":message});
          // save model to database
          saveStatus.save(function(err,state){
            if(err) throw err;
            console.log("Saved Status into DB",state);
        });
    object.result=true;
    }
   res.send(JSON.stringify(object));
})

app.get('/Status',function(req,res){
    res.sendFile(path.join(__dirname+'/public/views/Status.html'));
})

app.get('/api/statusTable',function(req,res){
Status.find({},function(err,sta){
    if(err) throw err;
    console.log(sta);
    res.send(JSON.stringify(sta));
});
})

var server=app.listen(4000,function(){
    console.log('Server started at port 4000')
})