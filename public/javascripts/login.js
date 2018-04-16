
$(function() {

    $('#btn-alert').click(function() {
        $('#div-alert').hide();
    });

    // $(".form").submit(function(e) {
    //     e.preventDefault(); // avoid to execute the actual submit of the form.
        
    //     var url = "/login"; // the script where you handle the form input.
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: $(".login-form").serialize(), // serializes the form's elements.
    //         success: function(userId)
    //         {
    //             //document.cookie = "loginId="+userId;
    //             alert(window.location.assign("/abc.html")); // show response from the php script.
    //         }
    //     });
    // });

//     $('#get-cookie').click(function(e) {
// //        alert(getCookie('loginId'));        
//         sayHello();
//     });

});
