
async function showSignInButtonOrUserProfile(){
  const response = await fetch('/loginstatus');
  const json = await response.json();
  const isLoggedIn = json.loginstatus;
  const url = json.url;
  const accountUsername = json.username;

  if (isLoggedIn) {
    displaySignInOrSignOutButton(isLoggedIn,url,accountUsername);
  } else {
    displaySignInOrSignOutButton(isLoggedIn,url,accountUsername);
  }


}

function start(){
    showSignInButtonOrUserProfile();
}

function displaySignInOrSignOutButton(loginStatus,url,username){
 
    var signOutButtonDOM = document.getElementById("sign-out-button");
    var signInButtonDOM = document.getElementById("sign-in-button");

    if(loginStatus){
        signOutButtonDOM.style.display="block";
        signOutButtonDOM.href = url;
        signOutButtonDOM.text = username;

        signInButtonDOM.style.display= "none";
    } else {
        signInButtonDOM.style.display="block";
        signInButtonDOM.href = url;

        signOutButtonDOM.style.display= "none";
    }

}
