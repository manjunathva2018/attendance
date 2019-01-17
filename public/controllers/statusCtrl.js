var app=angular.module('status',[]);
app.controller('statusCtrl',['$scope','$injector',function(s,i){
    const h=i.get('$http'),w=i.get('$window'),t=i.get('$timeout');

    s.err=false;
    s.warn=true;

    var loggedIn=sessionStorage.getItem('userName');

    if(loggedIn!=null || loggedIn!=undefined){
        s.userName=loggedIn;
        s.warn=false;
        t(timeOut,3000);
    }


    s.getUsersStatus=function(){

        h.get('/api/statusTable').then(
            function(response)
            {
          var statusList=response.data;
           var list=[];
           for(var i=0;i<statusList.length;i++){
              var obj={};
              var d=new Date(statusList[i].date);
              obj.date=d;
              obj.userName=statusList[i].userName;
              obj.status=statusList[i].status;
              obj.message=statusList[i].message;
              list.push(obj);
           }
           s.statusTable=list;
            console.log(list);
            },function(error){
          s.err=true;
            });
    }
  t(s.getUsersStatus(),1000);
    

    s.logout=function(){
        w.sessionStorage.clear();
        w.location.replace('/');
         }

         var timeOut=function(){
            s.err=false;
            s.warn=false;
        }

       
}]);