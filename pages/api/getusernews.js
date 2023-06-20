import connectDb from "@/middleware/mongoose";
import News from "@/models/News";
import jwt from "jsonwebtoken";


 const handler = async (req, res) => {

    const token = req.headers.authorization?.split(" ")[1];
if (!token) {
  return res.status(401).json({ error: "Unauthorized" });
}

try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

    // Find the news documents added by the authenticated user
    const news = await News.find({ createdBy: userId }).sort({ createdAt: -1 });

//   let news = await News.find();
    
    res.json({news})
} catch (error) {
  res.status(200).json({error: "error"})
  
}
    

    
  }


  export default connectDb(handler);