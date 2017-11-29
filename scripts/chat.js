setTimeout(load_user, 5000);
setTimeout(load_users, 5000);

$("html").ready(function() {
  load_user();
  load_users();
});

function load_user() {
  var user = localStorage.getItem('user');
  $("#chat_user").html(user);
}

function load_users() {
  $.get("http://www.angelito.com.br/webchat/users", function(data) {
    var users = JSON.parse(data);
    var online_users = 'Usuarios conectados: ';
    for (i = 0; i < users.length; i++) {
      if (i != 0) {
        online_users += ' | ' + users[i];
      }
      else {
        online_users += users[i];
      }
    }
    $("#online_users").html(online_users);
  });
}
