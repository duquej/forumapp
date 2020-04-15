$(document).ready(function(){
    initializePostThreadFormValidation();
    $('#postservlet-thread-button').click(function(event){
        validateThreadFormAndSubmit();
            });
});

function validateThreadFormAndSubmit(){
    if($("#post-thread-form").valid()){
                $.ajax({
                    type:"POST",
                    url: "post-thread",
                    data: $("#post-thread-form").serialize(),
                    success: function(data){
                        $('#makePostModal').click()
        
                        $("#success-thread-post-alert").fadeIn("slow",function(){
                                setTimeout(function(){
                                $("#success-thread-post-alert").fadeOut("slow");
                                },4000);
                            });
                 
                    },
                    error: function(data){
                        $('#makePostModal').click()
        
                        $("#failed-thread-post-alert").fadeIn("slow",function(){
                                setTimeout(function(){
                                $("#failed-thread-post-alert").fadeOut("slow");
                                },4000);
                            });
                           
                    }
                });
            }
}

function initializePostThreadFormValidation(){
    $('#post-thread-form').validate({ // initialize the validator
        rules: {
            "threadTitle": {
                required: true,
                minlength: 3
            },
            "bodyText": {
                required: true,
                minlength: 5
            }
        },
        messages :{
            "threadTitle" : {
                required : 'Enter thread title',
                minlength: "Thread title must be greater than 2 characters"
                },
            "bodyText":{
                required: "Your thread must have a body",
                minlength: "Your thread body must be greater than 4 characters"
            }

        }
    });


}