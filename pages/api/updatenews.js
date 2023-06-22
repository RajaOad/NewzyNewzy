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

    
  

        const {title, desc, lang, category, author, image, id} = req.body;

        let newNews = {}
    
        if(title){newNews.title = title};
        if(desc){newNews.desc = desc};
        if(category){newNews.category = category};
        if(lang){newNews.lang = lang};
        if(author){newNews.author = author};
        if(image){newNews.image = image};

       

        // Add the userId to the query condition to ensure the news belongs to the authenticated user
    let news = await News.findOne({ _id: id, createdBy: userId });

    if (!news) {
      return res.status(404).send({error:"Not Found"});
    }
    
        // let news = await News.findById(id);

        // if(!news) {
        //    return res.status(404).send("Not Found")
        // }
        
        news = await News.findByIdAndUpdate(id, {$set: newNews}, {new: true})
        res.json({success: "Successfully Updated"});
        
    } catch (error) {
        
        res.status(500).send("Internal Server Error");
    }

 
    
  }

  export default connectDb(handler);