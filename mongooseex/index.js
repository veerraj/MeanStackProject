var express=require("express");
var app=express();
var bodyparser=require("body-parser")
var mongoose=require("mongoose")
var cors=require("cors")
var Book=require('./Book.Model')

var db='mongodb://127.0.0.1:27017/mydb'
mongoose.connect(db)
var port=8000;
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(cors({origin:"http://localhost:4200"}));
mongoose.Promise=global.Promise;
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.get("/books",(req,res)=>{
    //res.send("getting all books")
    Book.find({})
    .exec()
    .then((result)=>{                //promise handling
        console.log(result);
        res.send(result)
    }).catch(
        (err)=>{
            res.send(err)
        }
        )
        // (err,result)=>{
    //    if(err) 
    //    {
    //        res.send("error")
    //    }
    //    else {
    //        res.send(result)
    //    }
    // })
})
app.get("/books/:id",(req,res)=>{
    //res.send("getting  books by id")
    Book.findOne({
        _id:req.params.id
    })
    .exec((err,result)=>{
       if(err) 
       {
           res.send("error")
       }
       else {
           res.send(result)
       }
    })
})

app.post('/books',(req,res)=>{
    newbook=new Book()
    newbook.title=req.body.title;
    newbook.author=req.body.author;
    newbook.catagory=req.body.catagory;
    newbook.save((err,result)=>{
        if(err)
        {
            res.send("error occured");
        }
        else
        {
            res.send(result)
        }
    })
})
app.post("/books2",(req,res)=>{
    //res.send("getting all books")
    Book.create(req.body,(err,result)=>{
       if(err) 
       {
           res.send("error")
       }
       else {
           res.send(result)
       }
    })
})

app.put("/books/:id",(req,res)=>{
    //res.send("updating book by id")
    var book={
        title:req.body.title,
        author:req.body.author,
        catagory:req.body.catagory
    }
    Book.findByIdAndUpdate(req.params.id,{$set:book},{new:true},(err,result)=>{
           if(err)
           {
               res.send("error");
           }
           else
           {
               console.log(result);
               return res.status(200).json({
                status: "updated successfuly"
              });
           }
     })
    })

app.delete("/books/:id",(req,res)=>{
    //res.send("deleting book by id")
    Book.findByIdAndRemove({
        _id:req.params.id
        },
        (err,result)=>{
            if(err)
            {
                res.send("error");
            }
            else
            {
                console.log(result);
                return res.status(200).json({
                status: "deleted successfuly"
                });
            }
        })
    })
app.listen(port,()=>{
    console.log("server is running on "+port)
})