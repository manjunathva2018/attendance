var app=angular.module('login',[]);
app.controller('loginCtrl',['$scope','$injector',function(s,i){
const h=i.get('$http'),t=i.get('$timeout'),w=i.get('$window');

s.regexUName='[a-z0-9]{3,15}';
s.regexPass='([a-zA-Z0-9]|[^\w]){3,15}';

s.warning=false;
s.error=false;
s.success=false;
s.info=false;

s.form={userName:"",password:""};
s.form1={newUName:"",newPass:"",confirmPassword:""};

s.submitLogin=function(form){
    var userName=form.userName;
    var password=form.password;

    h.post('/api/login?userName='+userName+'&password='+password).then(
        function(response){
            console.log(response.data);
            if(response.data.result==true){
                w.sessionStorage.setItem('userName',response.data.userName);
                window.location.replace('/Dashboard');
            }
            else{
             s.warning=true;
            }
        }
        ,function(error){
            s.warning=false;
            s.error=true;
        });

        s.form={userName:"",password:""};
        t(timeOut,3000);
}

s.submitRegister=function(form1){
    var userName=form1.newUName;
    var password=form1.newPass;
    var confirmPass=form1.confirmPassword;

   console.log("username===",userName);
    h.get('/api/getuser?userName='+userName).then(
        function(response){
           if(response.data.result==true){
              console.log("User Already Exists");
              s.info=true;

           }
           else{
               h.post('/api/adduser?userName='+userName+'&password='+password)
               .then(function(response){
               if(response.data.result==true){ s.success=true;}
                console.log(response.data);
               },function(error){
                s.error=true;
               });
            }
        },function(error){
            s.error=true;
        }
    );
    s.form1={newUName:"",newPass:"",confirmPassword:""};
    t(timeOut,3000);
}



var timeOut=function(){
    s.warning=false;
    s.error=false;
    s.success=false;
    s.info=false;
}
}]);