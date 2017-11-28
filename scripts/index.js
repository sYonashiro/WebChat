var btnSubmit = document.getElementById('btnSubmit');

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
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://www.angelito.com.br/webchat/reset_users", true);
  xhttp.send();
}

function reset_messages() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://www.angelito.com.br/webchat/reset_messages", true);
  xhttp.send();
}
