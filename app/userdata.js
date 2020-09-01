//importing express
const exp=require ("express");
const app=exp();

const mc=require("mongodb").MongoClient;
const path=require("path")
app.use(exp.static(path.join(__dirname,"/dist/app")))


const jwt=require("jsonwebtoken");

const url="mongodb+srv://navneeth2000:Navneeth2000@cluster0-tlpr0.mongodb.net/test?retryWrites=true&w=majority"
var dbo;

const salts= 10;
app.listen(4200,()=>console.log("server is on"))

mc.connect(url,{useUnifiedTopology: true,useNewUrlParser: true},(error,client)=>{
    if (error){
        console.log("error in connection",error);
    }
    else{
        dbo=client.db("homedb");
        console.log("sucessfully connected");
    }
});

//body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
//posting data of user while sign up
app.post('/home/signup',(request,response)=>{
    console.log("yes comming",request.body)
    var pass=request.body.password
    bcrypt.hash(pass, salts,(error,hash)=>{
        if (error)
        {
            console.log("error in hashing");
        }
        else 
        {
            request.body.password=hash;
            console.log(request.body)
            dbo.collection("homecollections").find({email:request.body.email},{phnum:request.body.phnum}).toArray((error,data)=>{
                if (data.length == 0)
                {
                    dbo.collection("homecollections").insertOne(request.body,(error,sucess)=>{
                        if(error)
                        {
                            console.log("error occured",error );
                        }
                        else{
                            console.log(request.body.name)
                            var name=request.body.name
                            response.status(200).json({
                                message: '1',
                                n:name
                            });
                        }
                    });
                }
                else{
                    response.status(200).json({
                        message: '0'
                    });
                }
            });
        }
    })
    
});

//to dispaly all user data
app.get('/quickbuy/get',(request,response)=>{
    dbo.collection("homecollections").find().toArray((error,database)=>{
        if(error){
            console.log("error occured",error);
        }
        else
        {
            if(database.length==0)
            {
                response.send("no data found");
            }
            else{
              response.send(database);
            }
           
        }
    })
});
//login
app.post('/home/login',(request,response)=>{
    console.log(request.body)
    dbo.collection("homecollections").find({email:request.body.email}).toArray((error,userdata)=>{
        console.log(userdata)
        if (error){
            console.log("error in login",error);
        }
        else{
            if (userdata.length==0)
            {
                console.log("haaaa")
                response.status(200).json({
                    message: '0'
                });
            }
            else{
                
                bcrypt.compare(request.body.password,userdata.password,(er,success)=>{
                    if (error){
                        response.status(200).json({
                            message: '2'

                        })
                    }
                    else
                    {
                        jwt.sign({email:userdata.email},'secret',{expiresIn:60},(err,token)=>
                        {
                            if (err) throw err
                            else{
                                console.log("signed token is",token)
                                response.status(200).json({
                                    message: '1',
                                    user:userdata,
                                    token:token
                                });
                            }
                        })
                        
                    }
                    
                })
            
                console.log(userdata)
            }
        }
    })
});
//to delete the user from database
app.delete('/quickbuy/removeuser',(request,response)=>{
    

    dbo.collection("homecollections").remove(
        {email:request.body.email},{
        fullname:request.body.fullname,
        phnum:request.body.phnum,
        password:request.body.password} ,(error,sucess)=>{
        if(error)
        {
            console.log("error occured",error );
        }
        else{
             response.send("userdata deleted successfully");
        }
    }) 
});








//to update user data
app.put('/quickbuy/updateuserinfo',(request,response)=>{
           
    
    dbo.collection("homecollections").find({email:request.body.email}).toArray((error,data)=>{
                  
        if (error){
            console.log("error occured",error)
        }
        else{
            if(data.length==0){
                response.send("no given email id")
            }
            else{
                dbo.collection("homecollections").update({email:request.body.email},{
                    fullname:request.body.fullname,
                    password:request.body.password,
                    
                    
                    
                },(error,succes)=>{
                                if(error){
                                    console.log("error in updating",error);
                                }
                                else{
                                    response.send("user profile is updated ");
                                }
                });
            }
        }
    })

});
app.get("/aboutus",(req,res)=>{
    res.redirect('/aboutus')
});