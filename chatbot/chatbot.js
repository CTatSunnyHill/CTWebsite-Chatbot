"use strict"

const dialogFlow = require('dialogflow')
const config = require('../config/keys')
const structjson = require('structjson')

const projectID = config.googleProjectID
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey.replace(/\\n/gm, '\n')
}

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials})
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID)

module.exports = {
    textQuery: async (text, parameter = {})=>{
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
eventQuery: async (event, parameter = {})=>{
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
        return response
}
}





