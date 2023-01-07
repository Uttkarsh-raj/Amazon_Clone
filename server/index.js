//Print => console.log('Hello,World');


//IMPORTS FROM PACKAGES
const express=require('express');//import statement => import 'package:epress/express.dart';

//IMPORTS FROM OTHER FILES
const authRouter=require('./routes/auth');

//INIT
const app=express();
const PORT=3000;

//middleware: CLIENT->SERVER->CLIENT but now CLIENT->middleware->SERVER->CLIENT,data formatting
app.use(authRouter);


//CREATING AN API
 
//http://<youripaddress>/helloworld
// app.get('/hello-world',(req,res)=>{
//     res.send("helloWorld");
// });
// to send data in json format...
// app.get('/',(req,res)=>{
//     res.json({'name':'ash'});
// })

app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}`);
});

