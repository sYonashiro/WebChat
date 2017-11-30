$("html").ready(function() {
  window.setTimeout(load_user, 5000);
  window.setTimeout(load_users, 5000);
  window.setInterval(load_messages, 1000);

  load_user();
  load_users();
  load_messages();

  $("#btn_send").click(function() {
    send_message();
  });

  $("#textmsg").keypress(function(event) {
    if (event.which == 13) {
      send_message();
    }
  });
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

function load_messages() {
  $.get("http://www.angelito.com.br/webchat/messages",
  { nickname: $("#chat_user").html() },
  function(data) {
    if (data === 'Usuário desconectado!') {
      alert('Usuário desconectado!');
      window.location.href = 'index.html';
      return;
    }

    var messages = JSON.parse(data);
    for (var i = 0; i < messages.length; i++) {
      if (i === 0) {
        $("#messages").html("<div class=\"message\"><span class=\"user\"><span class=\"date\"><b>" + messages[i].datetime + "</b></span><b> \"" + messages[i].user + " diz:\"</b></span><br><span class=\"message\">" + messages[i].textmsg + "</span></div>");
      }
      else {
        $("#messages").append("<div class=\"message\"><span class=\"user\"><span class=\"date\"><b>" + messages[i].datetime + "</b></span><b> \"" + messages[i].user + " diz:\"</b></span><br><span class=\"message\">" + messages[i].textmsg + "</span></div>");
      }
    }
  });
}

function send_message() {
  $.post("http://www.angelito.com.br/webchat/send",
  { nickname: $("#chat_user").html(), textmsg: $("#textmsg").val() },
  function() {
    $("#textmsg").val('');
  });
}
