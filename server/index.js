//~Print => console.log('Hello,World');


//~IMPORTS FROM PACKAGES~
const express=require('express');//import statement => import 'package:epress/express.dart';
const mongoose=require('mongoose');

//~IMPORTS FROM OTHER FILES~
const authRouter=require('./routes/auth');

//~INIT~
const app=express();
const PORT=3000;
const DB='mongodb+srv://Uttkarsh:AmazonClone@cluster0.desscqi.mongodb.net/?retryWrites=true&w=majority';

//~middleware: CLIENT->SERVER->CLIENT but now CLIENT->middleware->SERVER->CLIENT;use=>data formatting~
app.use(express.json());
app.use(authRouter);

//~CONNECTIONS~
mongoose
.connect(DB)
.then(()=>{
    console.log('Connection Successful')
})
.catch((e)=>{
    console.log(e);
});

//***CREATING AN API***
 
//http://<youripaddress>/helloworld
// app.get('/hello-world',(req,res)=>{
//     res.send("helloWorld");
// });
// to send data in json format...
// app.get('/',(req,res)=>{
//     res.json({'name':'ash'});
// })

app.listen(PORT, "0.0.0.0" ,()=>{
    console.log(`connected to port ${PORT}`);
});

