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
    //var online_users = 'Usuarios conectados: ';
    for (i = 0; i < users.length; i++) {
      if (i === 0) {
        $(".list-group").html("<li class=\"list-group-item\"><img src=\"images/user.png\"></img>" + " &nbsp" + users[i] + "</li>");
      }
      else {
        $(".list-group").append("<li class=\"list-group-item\"><img src=\"images/user.png\"></img>" + " &nbsp" + users[i] + "</li>");
      }
    }
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
      var messageHtml = '';

      if (messages[i].user === localStorage.getItem('user')) {
        messageHtml = "<div class=\"alert alert-primary my-2 p-2 ml-5 mr-3\"><span class=\"user\"><span class=\"date\"><b>" + messages[i].datetime + "</b></span><b> \"" + messages[i].user + " diz:\"</b></span><br><span class=\"message\">" + messages[i].textmsg + "</span></div>";
      }
      else {
        messageHtml = "<div class=\"alert alert-secondary my-2 p-2 mr-5 ml-1\"><span class=\"user\"><span class=\"date\"><b>" + messages[i].datetime + "</b></span><b> \"" + messages[i].user + " diz:\"</b></span><br><span class=\"message\">" + messages[i].textmsg + "</span></div>";
      }

      if (i === 0) {
        $("#messages").html(messageHtml);
      }
      else {
        $("#messages").append(messageHtml);
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
