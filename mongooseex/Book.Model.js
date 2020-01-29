var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var BookSchema=new Schema(
    {
        title:String,
        author:String,
        catagory:String

    }
)
module.exports=mongoose.model('Book',BookSchema)