"use strict"

const dialogFlow = require('dialogflow')
const config = require('../config/keys')
const structjson = require('structjson')
const mongoose = require('mongoose')

// const { dialogFlowSessionID } = require('../config/prod')

const projectID = config.googleProjectID
const sessionID = config.dialogFlowSessionID
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey.replace(/\\n/gm, '\n')
}

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials})
// const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID)

const Registration = require('../model/Registration')

module.exports = {
    textQuery: async (text,userID,parameter = {})=>{
      let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID)
      let self = module.exports
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              }
            },
            queryParams: {
                payload: {
                    data: parameter
                }
    
            }
          }
          let response = await sessionClient.detectIntent(request)
          response = await self.handleAction(response)
          return response
},
eventQuery: async (event, userID, parameter = {})=>{
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID)
    let self = module.exports
    const request = {
        session: sessionPath,
        queryInput: {
          event: {
            // The query to send to the dialogflow agent
            name: event,
            parameters:structjson.jsonToStructProto(parameter),
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          }
        }
   
      }
      let response = await sessionClient.detectIntent(request)
      response = await self.handleAction(response)
      return response
    },
    handleAction: (response) => {
      let self = module.exports
      let queryResult = response[0].queryResult

      switch(queryResult.action){
        case 'sunny-hill-location-yes':
          if(queryResult.allRequiredParamsPresent){
            self.saveRegistration(queryResult.parameters.fields)
          }
          break
      }


    return response
},
saveRegistration: async function(fields){
  const registration = new Registration({
      location: fields.location.stringValue,
      dateSent: Date.now()
  });
  try{
      let reg = await registration.save();
      console.log(reg);
  } catch (err){
      console.log(err);
  }
}
}





