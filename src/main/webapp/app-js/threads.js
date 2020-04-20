$(document).ready(function(){
    resetThreadPostFormOnModalHide();
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
                        
                        if (data.redirect){
                            window.location.href = data.redirect;
                        }
                 
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
       // errorClass: 'text-danger',
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

        },
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('success').addClass('text-danger');

        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('text-danger').addClass('text-success');

        }
 
    });


}

function resetThreadPostFormOnModalHide(){
    $('#makePostModal').on('hidden', function () {
        $('#post-thread-form').find('input[type="text"]').val('');
    });
}