$("html").ready(function() {
  $("#btnSubmit").click(function() {
    login();
  });

  $("#btnResetUsers").click(function() {
    reset_users();
  });

  $("#btnResetMsg").click(function() {
    reset_messages();
  });

  $("#nickname").keypress(function(event) {
    if (event.which == 13) {
      login();
    }
  });
});

function login() {
  var nickname = $("#nickname").val();

  $.post("http://www.angelito.com.br/webchat/user",
  { nickname: nickname },
  function(data) {
    if (data === 'Usuário inválido!') {
      alert('Usuário inválido!');
    }
    else {
      localStorage.setItem('user', nickname);
      window.location.href = 'chat.html';
    }
  });
}

function reset_users() {
  $.get("http://www.angelito.com.br/webchat/reset_users", function(data) {
    alert('Usuários desconectados!');
  });
}

function reset_messages() {
  $.get("http://www.angelito.com.br/webchat/reset_messages", function(data) {
    alert('Mensagens apagadas!');
  });
}
