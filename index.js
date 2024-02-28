const express = require('express')
const chalk = require('chalk')
const app = express()
const dFRouter = require('./router/dialogFlowRouter')

const port = process.env.PORT || 3001

app.use(express.json())

app.use(dFRouter)

app.listen(port, ()=>{
    console.log(chalk.green.bold("Server side app is running on port " + port))
})