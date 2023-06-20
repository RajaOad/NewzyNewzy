import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {

    if (req.method == 'POST') {
        console.log(req.body);

        try {

            const {email, password} = req.body;

             // Check if the email is registered
             const user = await User.findOne({email});
             console.log(user)

             
             if (!user) {

                return res.status(400).json({ error: "Invalid credentials" });

             }

             


             const isPasswordValid = await bcrypt.compare(password, user.password);

             if(!isPasswordValid) {
                
                return res.status(400).json({ error: "Invalid credentials"});
             }

             const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "2d"});
             res.status(200).json({ success: true, token, email: user.email });


            
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal Server Error" });
            
        }

    } else {
        res.status(400).json({ error: "This method id not allowed" })
    }

  }


  export default connectDb(handler);
  