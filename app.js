const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=80;
const bodyparser=require("body-parser");

// mongoose..

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//define mongoose schema...

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    address: String,
    more: String,
  });
  
  const Contact = mongoose.model('Contact', contactSchema);  

//express stuff..
app.use(express.static('static'));
app.use('/static',express.static('static'));
app.use(express.urlencoded());


//pug specific stuff..

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints//
app.get('/',(req,res)=>{
    const con="This is the best website of India";
    const params={'title': 'Dance Academy' ,'content':'con'};
    res.status(200).render('home.pug',params);
}); 
app.get('/contact',(req,res)=>{
    const con="This is the best website of India";
    const params={'title': 'Dance Academy' ,'content':'con'};
    res.status(200).render('contact.pug',params);
});
app.get('/schedule',(req,res)=>{
    // const con="This is the best website of India";
    // const params={'title': 'Dance Academy' ,'content':'con'};
    res.status(200).render('schedule.pug');
}); 


app.get('/about',(req,res)=>{
    res.render('about.pug');
});


app.post('/contact',(req,res)=>{
    // const submitted={message: 'your form has been submitted successfully'};
    // console.log(submitted)
    // res.status(200).render('contact.pug',submitted);
    var myData=new Contact(req.body);
    myData.save().then(()=>
    {
        res.send("Your form has been submitted successfully..")
    
    }).catch(()=>
    {
        res.status(400).send("form has not been saved")
    });
})
app.listen(port,()=>
{
    
   
    console.log(`server is running on port ${port}`);
})