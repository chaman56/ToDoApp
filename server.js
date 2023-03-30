const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const controller = require('./server/controller');
const { default: axios } = require('axios');

const app = express();

dotenv.config({path: 'config.env'})

app.use(morgan('tiny'))
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs");

const connectDB = async ()=>{
  try{
    const con = await mongoose.connect(process.env.mongourl,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })
    console.log(`mongodb connected :${con.connection.host}`)
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}
connectDB();

app.get('/', (req,res)=>{
  res.render('login')
})
app.get('/login', (req,res)=>{
  res.render('login')
})
app.get('/signup', (req,res)=>{
  res.render('signup')
})


app.post('/api/users', controller.signup);
app.get('/api/users', controller.login);
app.put('/api/users/:id', controller.addtask)
app.delete('/api/users/:id/:index', controller.delete)
app.put('/api/users/task/:id/:index', controller.updatetask);


const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
  console.log("Listening on http://localhost:3000")
})