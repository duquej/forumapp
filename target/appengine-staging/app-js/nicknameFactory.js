async function fetchAndDisplayNicknameInfo(){
  const response = await fetch('/nickname');
  const json = await response.json();
  const url = json.url;
  const loggedInStatus = json.loggedin;
  const nickname = json.nickname;
  displayLoginLogoutOrForm(nickname,url,loggedInStatus);
  
}

/** 
 * Displays the login link if not signed in, else displays the nickname form.
 * {@code nickname} is the user's nickname, {@code url} is the URL to display, and 
 * {@code loggedInStatus} is a boolean representing whether the user is logged in.
 */
function displayLoginLogoutOrForm(nickname,url,loggedInStatus){
  if (loggedInStatus){  
    document.getElementById("nickname-input").value = nickname;
  } 
}

function setNewNickname(){
            $.ajax({
                    type:"POST",
                    url: "nickname",
                    data: $("#post-nickname-form").serialize(),
                    success: function(data){
        
                        $("#success-nickname-post-alert").fadeIn("slow",function(){
                                setTimeout(function(){
                                $("#success-nickname-post-alert").fadeOut("slow");
                                },4000);
                            });
                        setTimeout(function(){
                            location.reload();
                        }, 4600);
                 
                    },

                    error: function(data){
        
                        $("#failed-nickname-post-alert").fadeIn("slow",function(){
                                setTimeout(function(){
                                $("#failed-nickname-post-alert").fadeOut("slow");
                                },4000);
                            });
                           
                    }
                });

}