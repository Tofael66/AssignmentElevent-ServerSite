const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(express.json())


// asseignmentElevent
// oiH7hafGizByrRAV


/**
 * 
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate
 * some setion complate

 */


// const uri = `mongodb+srv://conceptional_day_one:lnDvK2fyU6AS8aHV@cluster0.5as8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const uri = "mongodb+srv://asseignmentElevent:oiH7hafGizByrRAV@cluster0.ai5dk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {

const db = client.db('elevent-db')
const carCollection = db.collection('cars') 
const carBookingCollection = db.collection('Book') 

app.post('/add-car' ,  async (req , res) =>{
  const carData = req.body 
  const result = await carCollection.insertOne(carData)
  //console.log(carData) 
  res.send(result)
})


// bookdataPost save mongodb

app.post('/add-book' ,  async (req , res) =>{

  const bookDatas = req.body 
    // 0. are you booking this cars . how to check it
    
   const query = {bookEmail: bookDatas.bookEmail , bookId: bookDatas.bookId}
   console.log( 'quer id , em' ,query)
    const alredyExist = await carBookingCollection.findOne(query)
    console.log(  'alredyExist' , alredyExist)
   if(alredyExist) return res.status(400).send('you are already book')
    

  // 1. save data 

  const result = await carBookingCollection.insertOne(bookDatas)

    // 2.  update date 
    const filter = { _id: new ObjectId(bookDatas.bookId)}
    console.log('filter' , filter)
   const update = {
    $inc:{bookingCount: 1 } ,
   }
    const updatedDateBidCount = await carCollection.updateOne(filter , update )
//console.log( 'upadet bioking' , updatedDateBidCount)
 
  //console.log(result) 
  res.send(result)
})


// cancel bookin cars 
app.delete('/get-book/:id' , async(req , res ) =>{
  const id = req.params.id 
  const quire = {_id: new ObjectId(id)}
  const result = await carBookingCollection.deleteOne(quire)
  res.send(result)
  })

  // get cancel data for delete
  app.get('/get-book/:id' , async(req , res ) => {
    const id =req.params.id ;
    const quire = {_id: new ObjectId(id)}
    const result = await carBookingCollection.findOne(quire) ;
    res.send(result)
  })

app.get('/get-car/:id' , async(req , res ) => {
  const id =req.params.id ;
  const quire = {_id: new ObjectId(id)}
  const result = await carCollection.findOne(quire) ;
  res.send(result)
})

// get all job
app.get('/all-cars' ,  async(req , res) =>{
  const result = await carCollection.find().toArray() ;
  res.send(result) ;
})


// get all bookData
app.get('/all-book' ,  async(req , res) =>{
  const result = await carBookingCollection.find().toArray() ;
  res.send(result) ;
})


// get all bookcars for delete 
app.get ('/get-book' , async(req , res) =>{
  const cursor =carBookingCollection.find() ;
  const result = await cursor.toArray() ;
  res.send(result) ;
    })


    // boking car thake date update 

    app.put('/get-book/:id' , async (req ,res) =>{
      const id =req.params.id ;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true} ;
      const updateddate = req.body ;
      const updatedcs = {
   $set: {
    deadline: updateddate.deadline ,
    endDated : updateddate.endDated  
   }
      }

      const result = await carBookingCollection.updateOne(filter , updatedcs , options)
      res.send(result);
    })






app.get ('/get-car' , async(req , res) =>{
  const cursor =carCollection.find() ;
  const result = await cursor.toArray() ;
  res.send(result) ;
    })

    app.put('/get-car/:id' , async (req ,res) =>{
      const id =req.params.id ;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true} ;
      const updatedCors = req.body ;
      const updatedc = {
   $set: {
    Car_Model: updatedCors.Car_Model ,
    deadline: updatedCors.deadline ,
   Rental_Price: updatedCors.Rental_Price , 
   Availability: updatedCors.Availability ,
   Registration_Number:updatedCors.Availability   ,
   location: updatedCors.location ,
   features:updatedCors.features ,
   photo: updatedCors.photo , 
   bookingCount: updatedCors.bookingCount ,
   description:updatedCors.description 
   }
      }

      const result = await carCollection.updateOne(filter , updatedc , options)
      res.send(result);
    })

// app.get('/get-car' , async(req , res) =>{
//   const result = await carCollection.find().toArray() 
//   res.send(result)
// })

// get all car 
// app.get('/get-car/:email' , async (req , res) =>{
//   const email = req.params.email 
// const quire = {'buyer.email ': email} // buyer akta object tai 
//  const result = await carCollection.find(quire).toArray()
//   res.send(result)
// })

// delete method 

app.delete('/get-car/:id' , async(req , res ) =>{
const id = req.params.id 
const quire = {_id: new ObjectId(id)}
const result = await carCollection.deleteOne(quire)
res.send(result)
})

/// get single car data fo dpdate
// app.get('/get-car/:id' , async(req , res) =>{
//   const id = req.params.id 
//   const quire = {_id: new ObjectId(id)}
//   const result = await carCollection.findOne(quire)
//   res.send(result)
// })

// update start





// update end

    // Send a ping to confirm a successful connection
    //await client.db('admin').command({ ping: 1 })
  
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello from SoloSphere Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
