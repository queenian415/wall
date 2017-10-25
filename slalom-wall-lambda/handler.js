'use strict';
const request = require('request');

module.exports.installed = (event, context, callback) => {
  console.log(event);
  const response = {
    statusCode: 200,
    headers: {
       "Access-Control-Allow-Origin" : "*",
       "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  var installation = JSON.parse(event.body);
  var capabilitiesUrl = installation['capabilitiesUrl'];

  // Get token url and api url
  request.get(capabilitiesUrl, function (err, res, body) {
    var capabilities = JSON.parse(body);

    // Save the token endpoint URL along with the client credentials
    installation.tokenUrl = capabilities.capabilities.oauth2Provider.tokenUrl;

    // Save the API endpoint URL along with the client credentials
    installation.apiUrl = capabilities.capabilities.hipchatApiProvider.url;

    // Request for access token
    var params = {
      uri: installation.tokenUrl,
      auth: {
          username: installation.oauthId,
          password: installation.oauthSecret
      },
      form: {
          grant_type: 'client_credentials'
      }
    };

    // Post request for access token
    request.post(params, function (err, res, body) {
      var accessToken = JSON.parse(body);
      console.log("accessToken: " + accessToken.access_token);
      const roomId = installation.roomId;
      const notificationUrl = installation.apiUrl + "/room/" + roomId + "/notification";
      
      // Post request to send hipchat installation message
      request({
        method: 'POST',
        url: notificationUrl,
        qs: {auth_token: accessToken.access_token},
        body: {message: 'Slalom Wall add-on installed!'},
        json: true
      }, function(err, res, body){
          var error = null;
          if (err || (body && body.error)) {
            error = new Error(err || body.error.message)
            console.log(error);
          }
          callback(error, response);       
      });
    });
  });
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
