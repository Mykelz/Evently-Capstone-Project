const app = require('./app');
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECT).then(connection=>{
    console.log('Database connected')
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
    })
}).catch(err=>{
    console.log(err)
})