
const User = require('./model');

exports.signup = (req,res)=>{
  if(!req.body){1
    res.status(404).send({message : "Can not send empty request!"})
    return;
  }
  const user = new User({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    password : req.body.password,
    tasks : [
       "This is a sample Task."
    ]
  })

  user.save(user).then(user =>{
        //res.send(data)
        res.redirect('/login')
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occured while creating!"
        })
  })
}


exports.login = (req,res)=>{
  const em = req.query.username;
  const ps = req.query.password;
  User.find({username : em}).then(user =>{
    if(user[0].password==ps){
      res.render('index',{user:user});
    }else{
      res.send("Password is Wrong!")
    }
  }).catch(err =>{
    res.status(500).send({message : err.message || "Error occured while retriving userdata"})
  })
}

exports.addtask = (req,res)=>{
  if(!req.body){
    return res
        .status(400)
        .send({message : "No Data has been enterd for update!"})
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, {useFindAndModify:false}).then(data =>{
    if(!data){
        res.status(404).send({message: `User with id ${id} not found!`})
    }else{
      const Task = {
        task : req.body.task,
        ischecked : false,
        date : Date.now,
      }
      data.tasks.push(Task)
      data.save(data)
    }
  }).catch(err=>{
    res.status(500).send({message: "Error while Updating User!"})
  })
}

exports.updatetask = (req,res)=>{
  const id =req.params.id;
  const index = req.params.index;
  User.findById(id).then(data =>{
    if(!data){
        res.status(404).send({message: `User with id ${id} not found!`})
    }else{
      let a;
      if(data.tasks[index].ischecked){
      a = false;
      }else{
      a = true;
      }
    }
  }).catch(err=>{
    res.status(500).send({message: "Error while Updating User!"})
  })
  
}

exports.delete = (req , res)=>{
  const id = req.params.id;
  const index = req.params.index;
  User.findById(id).then(data=>{
      if(!data){
          res.status(404).send({message : `Can not delete user ${id}, maybe wrong Id`})
      }else{
        data.tasks.remove(data.tasks[index]);
        data.save(data);
        //res.send({message : "Deleted Successfully!"})
      }
  }).catch(err=>{
      res.status(500).send({message: `could not delete Uesr with id = ${id}`})
  })
}


/* if( (ischecked!=null || ischecked!=undefined)){
  User.findById(id).then(data=>{
      if(!data){
          res.status(404).send({message : `Can not delete user ${id}, maybe wrong Id`})
      }else{
        //data.ischecked = ischecked;
        data.tasks[index].push(ischecked);
        data.save(data).then(data =>{
          console.log("Deleted successfully");
        })
        
        //res.send({message : "Deleted Successfully!"})
      }
  }).catch(err=>{
      res.status(500).send({message: `could not delete Uesr with id = ${id}`})
  })
}else */