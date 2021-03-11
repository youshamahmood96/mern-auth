const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

// routes

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')

//app

const app = express()
if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin:process.env.CLIENT_URL}));
}
//middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//routes middlewares

app.use('/api',blogRoutes,authRoutes,userRoutes,categoryRoutes,tagRoutes)
//Database
// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x8sqy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose
.connect( process.env.DB_LOCAL ,
     {  useNewUrlParser: true,
        useFindAndModify:false,
        useUnifiedTopology:true,
        useCreateIndex: true})
.then(()=>{
})
.catch(err=>{
})

//port

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})