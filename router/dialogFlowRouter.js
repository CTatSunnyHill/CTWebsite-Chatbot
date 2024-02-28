const express = require('express')
const chatbot = require('../chatbot/chatbot')
const router = new express.Router()

router.post('/api/df_text_query', async (req,res)=>{
  try{
    const response = await chatbot.textQuery(req.body.text,req.body.parameters)
    res.status(201).send(response[0].queryResult)
  } catch(e){
    res.status(400).send()
  }
})

router.post('/api/df_event_query', async (req,res)=>{
  try{
    const response = await chatbot.eventQuery(req.body.event,req.body.parameters)
    res.status(201).send(response[0].queryResult)
  } catch(e){
    res.status(400).send()
  }
})

module.exports = router