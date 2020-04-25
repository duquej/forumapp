var accountUsername;

async function showSignInButtonOrUserProfile(){
  const response = await fetch('/loginstatus');
  const json = await response.json();
  const isLoggedIn = json.loginstatus;
  const url = json.url;
  accountUsername = json.username;

  if (isLoggedIn) {
    displayPostLoginLogoutButton(isLoggedIn,url,accountUsername);
  } else {
    displayPostLoginLogoutButton(isLoggedIn,url,accountUsername);
  }


}

function start(){
    showSignInButtonOrUserProfile();
}

function displayPostLoginLogoutButton(loginStatus,url,username){
     displayOrHideAddNewPostButton(loginStatus);

    var profileButtonDOM = document.getElementById("profile-button");
    var signInButtonDOM = document.getElementById("sign-in-button");
    var signOutButtonDOM = document.getElementById("sign-out-button");
    
    if(loginStatus){
        profileButtonDOM.style.display="block";
        signOutButtonDOM.href = url;
        profileButtonDOM.text = username;

        signInButtonDOM.style.display= "none";
    } else {
        signInButtonDOM.style.display="block";
        signInButtonDOM.href = url;

        signOutButtonDOM.style.display= "none";
    }

}

function displayOrHideAddNewPostButton(isLoggedIn){
    if (isLoggedIn){
        const makePostButtonDom = document.getElementById("new-post-button");
        makePostButtonDom.style.display= "block";
    }

}
