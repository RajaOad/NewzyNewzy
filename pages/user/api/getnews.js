import connectDb from "@/middleware/mongoose";
import News from "@/models/News";

 const handler = async (req, res) => {

try {
  let news = await News.find();
    
    res.json({news})
} catch (error) {
  res.status(200).json({error: "error"})
  
}
    

    
  }


  export default connectDb(handler);