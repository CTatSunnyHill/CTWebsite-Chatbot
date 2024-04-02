const express = require('express')
const chatbot = require('../chatbot/chatbot')
const router = new express.Router()

// router.get('/', (req,res)=>{
//   try{
//     res.status(201).send("Welcome to Sunny Hill ChatBot")
//   }catch(e){
//     res.status(400).send()
//   }
// })

router.post('/api/df_text_query', async (req,res)=>{
  try{
    const response = await chatbot.textQuery(req.body.text,req.body.userID,req.body.parameters)
    console.log(req.body)
    res.status(201).send(response[0].queryResult)
  } catch(e){
    res.status(400).send({error: e.message})
  }
})

router.post('/api/df_event_query', async (req,res)=>{
  try{
    const response = await chatbot.eventQuery(req.body.event,req.body.userID,req.body.parameters)
    res.status(201).send(response[0].queryResult)
  } catch(e){
    res.status(400).send()
  }
})

module.exports = router