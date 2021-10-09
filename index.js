const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');
const { MongoClient } = require('mongodb');
const port = 4000;



app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://rifat:rifat123@cluster0.2vfwg.mongodb.net/Online-Compounder?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/',(req,res)=>{
    res.send("Thank you");
})



client.connect(err => {

  const collection = client.db("Online-Compounder").collection("user-Details-DB");

  app.post('/login',(req,res)=>{

     //console.log(req.body)
 
     try{
 
     let data = req.body
 
     data.slugfield=[],
     data.token="",
     data.registration="",
     data.doctorChamber=[],
     data.isAdmin=false,
     data.isModerator=false,
     data.isDoctor=false,
     data.appointmentHistory=[]
 
     res.status(200).send({
       msg : "succesfully new registered",
       data
     })
 
    // console.log(req.body);
 
   
   }
   catch(err)
   {
     res.status(500).send({
       msg : "server side error"
     })
   }

   collection.insertOne(req.body)
   .then(result=>{
       console.log('one Prodecut Add')
   })
   console.log('Data Base Conneceted')
   })




   app.put('/userUpdate',(req,res)=>{

    console.log(req.body);

    collection.find({name:"Rifat"})
    .toArray( (err,data)=>{
      console.log(data);
    })

    

    // if(req.body.name!=null)
    // {
      
    // }



   })



   











   
 
});























// app.post('/login',(req,res)=>{

//    // console.log(req.body)

//     try{

//     let data = req.body

//     data.slugfield=[],
//     data.token="",
//     data.registration="",
//     data.doctorChamber=[],
//     data.isAdmin=false,
//     data.isModerator=false,
//     data.isDoctor=false,
//     data.appointmentHistory=[]

//     res.status(200).send({
//       msg : "succesfully new registered",
//       data
//     })

//     console.log(req.body);

  
//   }
//   catch(err)
//   {
//     res.status(500).send({
//       msg : "server side error"
//     })
//   }

//   })

//   app.post('/hospitalModel',(req,res)=>{
//     try{

//         let data = req.body
    
//         data.name="",
//         data.address="",
//         data.phone="",
//         data.alternativePhone="",
//         res.status(200).send({
//           msg : "succesfully new registered",
//           data
//         })
    
//         console.log(req.body);
    
      
//       }
//       catch(err)
//       {
//         res.status(500).send({
//           msg : "server side error"
//         })
//       }
    

//   })

app.listen(4000,()=>console.log('Find to the port 4000'))

