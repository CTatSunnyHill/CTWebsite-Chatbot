const express = require('express')
const chalk = require('chalk')
const config = require('./config/keys')
// const mongoose = require('mongoose')
const app = express()
const dFRouter = require('./router/dialogFlowRouter')
// require('./model/Registration')


// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully.'))
//   .catch(err => console.error('MongoDB connection error:', err));





const port = process.env.PORT || 3001

app.use(express.json())

app.use(dFRouter)

app.listen(port, ()=>{
    console.log(chalk.green.bold("Server side app is running on port " + port))
})


// const Registration = mongoose.model('registration');

// app.get('/', async (req, res) => {
//     try {
//         const latestLocation = await Registration.findOne().sort({ dateSent: -1 })
//         console.log(req.json(latestLocation))
       
//     } catch (error) {
//         console.error('Error fetching latest location:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

