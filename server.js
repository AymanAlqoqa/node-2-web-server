const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

let app=express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine',hbs);

hbs.registerHelper('getCurrentYear',()=>{
  return '@'+new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

// app.use((req,res,next)=>{
//   return res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  let now=new Date().toString();
  let log= `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err) console.log('Unable to write to log file!');
  })
  next();
});



app.get('/',(req,res)=>{
  return res.render('home.hbs',{
    pageTitle:'Home Page',
    messageText:'Welcome To my First Site',

  });
});

app.get('/about',(req,res)=>{
  return res.render('about.hbs',{
    pageTitle:'About Page',

  });
});

//send error message
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'OOPS!....Unable to handle this page!!!'
  });
})

app.listen(port,()=>{
  return console.log(`Server is up on port:${port}`);
});
