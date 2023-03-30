const mongoose = require('mongoose')
const userdb = new mongoose.Schema({
  name : String,
  username :{
    type : String,
    required : true,
    unique : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tasks : {
    type: Array,
    of:Object
  },
  
})

const User = mongoose.model('user', userdb);
module.exports = User

/* const Taskdb = new mongoose.Schema({
  task : {
    type:String,
    required : true
  },
  ischecked:{
    type:Boolean,
    default : false
  },
  date:{
    type:Date,
    default: Date.now
  }
})
const Tasks = mongoose.model('tasks',Taskdb);
module.exports = Tasks */