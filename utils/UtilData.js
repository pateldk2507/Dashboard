const axios = require("axios");
const { get } = require("http");
const moment = require("moment");

const tokenUrl = "https://teleco.halopsa.com/auth/token";
const clientId =  'ADD CLIENT ID HERE';
const clientSecret =  'ADD CLIENT SECRET HERE';

let accessToken = null;
let tokenExpiry = null;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const getToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: tokenUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "all",
      },
    });

    accessToken = response.data.access_token;
    tokenExpiry = moment().add(1, "hour");
    console.log('new access token');
    return accessToken;
  } catch (error) {
    console.error(
      "Error getting token:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

const getAccessToken = async () => {
  if (!accessToken || moment().isAfter(tokenExpiry)) {
    await getToken();
  }
  return accessToken;
};

const getAgents = async () => {
    const response = await axios.get("https://teleco.halopsa.com/api/agent", {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

  const myArray = [];
  for(const key in response.data){
      myArray[response.data[key].id] = response.data[key].name; 
  }
  localStorage.setItem('agent',myArray.toString());
  return myArray;
}

module.exports = { getAccessToken, getAgents };
