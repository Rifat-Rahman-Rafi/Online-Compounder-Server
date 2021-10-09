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

  app.post('/login',async (req,res)=>{
     //console.log(req.body)
     try{
     
      if(req.body.email===undefined)return res.status(501).send({
      msg : "Email required"
     })

      var allinfo= await collection.findOne({email:req.body.email})
      if(allinfo===null)
      {
          let data = {...req.body}
          data.slugfield=[],
          data.token="",
          data.registration="",
          data.doctorChamber=[],
          data.isAdmin=false,
          data.isModerator=false,
          data.isDoctor=false,
          data.appointmentHistory=[]
          data =await collection.insertOne(data)

      }
        data = await collection.findOne({email:req.body.email})
     
        res.status(200).send({
          data 
        })
      }
        catch(err)
        {
          res.status(500).send({
            msg : "internal server side error"
          })
        }

   })
 
   

   app.put('/userUpdate',async (req,res)=>{
    // req.body.email
    // data = req.body.adminemail


    // if(data === null || data.isAdmin==false)

    try{

      if(req.body.email===undefined)return res.status(501).send({
        msg : "Email required"
       })

      let data  = await collection.find({email:req.body.email})

      if(req.body.name!==undefined) data.name = req.body.name
      if(req.body.pic!=undefined) data.photo=req.body.pic  
        await collection.updateOne({email:req.body.email},
          {
            $set:data
          }
          )
    }
    catch(err)
        {
          res.status(500).send({
            msg : "Internal server side error"
          })
        }
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

