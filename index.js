function submitForm() {
  const serverip = document.getElementById("serverip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    "serverip" : serverip,
    "username" : username,
    "password" : password
  };

  fetch("https://6kjae2ai40.execute-api.us-east-1.amazonaws.com/default/compassAmplify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
}
