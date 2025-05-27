const express = require('express');
const app = express()
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const cron = require('node-cron')
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const capsuleRoutes = require('./routes/chronoLock.routes')
const {checkRevealDates} = require('./services/notificationService')


dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(cors({origin:'http://localhost:5173', credentials:true}))
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


cron.schedule('0 0 * * *', checkRevealDates);



app.get('/', (req,res)=>{
    res.send('server is running');
})

app.use('/api/auth', authRoutes)
app.use('/api/auth', authRoutes)



app.use('/api/capsules',capsuleRoutes)
app.use('/api/capsules', capsuleRoutes)


// checkRevealDates();