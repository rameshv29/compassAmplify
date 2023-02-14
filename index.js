import { API } from 'aws-amplify';

async function submitData(serverip, username, password) {
  try {
    const request = {
      body: {
        serverip,
        username,
        password
      }
    };
    const response = await API.post('https://6kjae2ai40.execute-api.us-east-1.amazonaws.com/default', '/compassAmplify', request);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}