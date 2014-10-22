$(document).ready(function(){
    $('#auth').submit(function(){
        var user = $('.userName').val();
        localStorage.setItem('user', user);
        console.log(localStorage.user);
    });
});