var app=angular.module('dashboard',[]);
app.controller('dashboardCtrl',['$scope','$injector',function(s,i){

    const h=i.get('$http'),w=i.get('$window'),t=i.get('$timeout');

    var date=new Date();
    var dd=date.getDate();
    var mm=date.getMonth();
    mm=mm+1;
    var yyyy=date.getFullYear();
    var hrs=date.getHours();
    var min=date.getMinutes();

    s.todayDate=dd+"/"+mm+"/"+yyyy+"  "+hrs+":"+min;

    s.regex="([a-zA-Z0-9]|[^\w]){0,150}";

    s.succ=false;
    s.err=false;
    s.warn=true;
    
    var loggedIn=sessionStorage.getItem('userName');

    if(loggedIn!=null || loggedIn!=undefined){
        s.userName=loggedIn;
        s.warn=false;
        t(timeOut,3000);
    }
    

    s.submitStatus=function(){
    var status=s.attend.status;
    var message=s.attend.message;

    if(loggedIn!=null || loggedIn!=undefined){
        h.post('/api/substatus?userName='+loggedIn+'&status='+status+'&message='+message+'&date='+date.toUTCString())
        .then(function(response){
            console.log("Submission:",response.data);
            if(response.data.result==true){  
                s.succ=true;
                t(timeOut,3000);    
            }
        },function(error){
            s.err=true;
            t(timeOut,3000);
        })
    }
    else{s.warn=true; t(timeOut,3000);}
   }
   

    s.logout=function(){
   w.sessionStorage.clear();
   w.location.replace('/');
    }

    var timeOut=function(){
        s.succ=false;
        s.err=false;
        s.warn=false;
    }
    

}]);