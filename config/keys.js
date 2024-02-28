// module.exports = {
//     googleProjectID: 'healthbc-chatbot',
//     dialogFlowSessionID: 'healthbc-chatbot-session_id',
//     dialogFlowSessionLanguageCode: 'en-US'
// }

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}