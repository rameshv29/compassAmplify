function submitForm() {
  const serverip = document.getElementById("serverip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    "serverip": serverip,
    "username": username,
    "password": password
  }

  $.ajax({
    type: "POST",
    url: "https://6kjae2ai40.execute-api.us-east-1.amazonaws.com/default/compassAmplify",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });
}

