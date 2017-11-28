setTimeout(load_user, 5000);
setTimeout(load_users, 5000);

function init() {
  load_user();
  load_users();
}

function load_user() {
  var user = localStorage.getItem('user');
  document.getElementById('chat_user').innerHTML = user;
}

function load_users() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // 4 DONE | 200 OK
    if (this.readyState == 4 && this.status == 200) {
      var users = JSON.parse(this.responseText);
      var online_users = 'Usuarios conectados: ';
      for (i = 0; i < users.length; i++) {
        if (i != 0) {
          online_users += ' | ' + users[i];
        }
        else {
          online_users += users[i];
        }
      }
      document.getElementById('online_users').innerHTML = online_users;
    }
  };
  xhttp.open("GET", "http://www.angelito.com.br/webchat/users", true);
  xhttp.send();
}
