import connectDb from "@/middleware/mongoose"
import News from "@/models/News";
import jwt from "jsonwebtoken";



const handler = async (req, res) => {

    const {id }= req.query;
    console.log(req.query)

    const token = req.headers.authorization?.split(" ")[1];
if (!token) {
  return res.status(401).json({ error: "Unauthorized" });
}


try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

     // Add the userId to the query condition to ensure the news belongs to the authenticated user
  let news = await News.findOne({ _id: id, createdBy: userId });

  if (!news) {
   return res.status(404).json({ error: "News not found" })
  }

    news = await News.findByIdAndDelete(id)
    res.json({success: "News has been deleted" });
    
} catch (error) {

    console.error(error.message);
    res.status(500).send("Internal Server Error");
    
}
   

    
  }

  export  default connectDb(handler);