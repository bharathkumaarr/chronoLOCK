const express = require('express');
const app = express()
const dotenv= require('dotenv')
const mongoose=require('mongoose')


dotenv.config()
const PORT = process.env.PORT || 3000;


app.use(express.json())
// const connectDB= async()=>{
    // try {
    //     await mongoose.connect(process.env.MONGO_URI,{
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     });
    //     console.log('connected to db');
    // }
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to db');
        app.listen(PORT, ()=>{
            console.log('server is running at port 3000');
        })
        
    })
    .catch((error)=>{
        console.error('connection failed: ', error.message)
        process.exit(1)
    })

app.get('/', (req,res)=>{
    res.send('server is running');
})


