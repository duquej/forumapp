async function getRequest(){
  const path = window.location.pathname.split('/');
  //request key should be last part of url
  requestKey = path[path.length-1];
  const response = await fetch(`/request/${requestKey}`);
  if(response.status != 200){
    window.location.replace("/request-not-found");
    return;
  }
  const bookRequest = await response.json();
}