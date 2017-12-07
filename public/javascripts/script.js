function submit() {
  let emailVal = $('#email').val();
  let error = $('#error');

  error.text("");

  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(emailVal)) {
    error.text("Not a valid email");
    return;
  }

  $('#email-form').hide();

  let game = new Game(20, 10, "stage", "score", "deaths", "max_score");

  error.text("PRESS ENTER NOW TO PLAY SNAKE WHILE YOU WAIT");

  let request = {"email": emailVal};

  $.ajax({
    type: 'POST',
    url: '/email',
    async : true,
    dataType: 'json',
    data: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    },
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      game.pause();
      $('#stage').empty();
      $('#error').text("");
      $('#success').text("SUCCESSFULLY H8MAILED");
      $('#again-button').show();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Errors: ' + textStatus + ' ' + errorThrown);
    }
  });
}

function reset() {
  $('#again-button').hide();
  $('#email-form').show();
  $('#success').text("");
  $('#badges').show();
}