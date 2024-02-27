const express = require('express')
const chalk = require('chalk')
const app = express()

const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(chalk.green.bold("Server side app is running on port 3001"))
})