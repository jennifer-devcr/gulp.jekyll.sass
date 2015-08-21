"use strict";

Rimes.Login = (function(){
    function login(){
        var userID =  $('#userID').val(),
            pass =  $('#pass').val();
        localStorage.userid = '';

        if(userID.length == 0 || pass.length == 0){
            $('.login-form .r-error-txt').removeClass('hide');
        }else{
            localStorage.userid = userID;
            window.location.href = '/apps/bds/benchmarkdataservice.html';
        }
    }

    function pressedEnter(e){
        var evt = window.event ? window.event : e,
            unicode = evt.keyCode ? evt.keyCode : evt.charCode;

        if(unicode == 13)
            login();
    }

    return {
        login: login,
        pressedEnter: pressedEnter
    };
})();