const app = require('./app');
const mongoose = require('mongoose')
const redis = require('./utils/redis')
require('dotenv').config();

mongoose.connect(process.env.CONNECT).then(connection=>{
    console.log('Database connected')
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
    })
    redis.connect()
}).catch(err=>{
    console.log(err)
})