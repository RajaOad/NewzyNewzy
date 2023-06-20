import connectDb from "@/middleware/mongoose";
import News from "@/models/News";
import jwt from "jsonwebtoken";

const handler = async (req, res)=> {
if (req.method == 'POST') {

    const token = req.headers.authorization?.split(" ")[1];
   
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    

    try {

        // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
     

        for (let i=0; i< req.body.length; i++) {

            const existingNews = await News.findOne({ title: req.body[i].title });

            if (existingNews) {
                return res.status(400).json({ error: "News with this title already exists" });
              }


            let n = new News({

                title: req.body[i].title,
                desc: req.body[i].desc,
                category: req.body[i].category,
                lang: req.body[i].lang,
                author: req.body[i].author,
                image: req.body[i].image,
                createdBy: userId,
            
            })

            await n.save()

            
        }

        res.status(200).json({ success: true })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error"  })
    }

} else {
    res.status(400).json({ error: "This method is not allowed" })
}
};

export default connectDb(handler);
