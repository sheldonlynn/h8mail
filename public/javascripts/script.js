function submit() {

  var email = $('#email').val();
  $('#error').text("");

  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    $('#error').text("Not a valid email");
    return;
  }

  var request = {"email": email};

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/email',
    async : true,
    dataType: 'json',
    data: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    },
    success: function(data, textStatus, jqXHR) {
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Errors: ' + textStatus + ' ' + errorThrown);
    }


  });
}