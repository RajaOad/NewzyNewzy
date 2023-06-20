import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = async (req, res) => {

    if (req.method == 'POST') {
        console.log(req.body)

        try {

            const {name, email} = req.body;

            // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let user = new User({name, email, password: hashedPassword})

        await user.save();

        res.status(200).json({ success: "Success" })
            
        } catch (error) {
            res.status(400).json({ error: "Internal Server Error" })
        }

        

    } else {
        res.status(400).json({ error: "This method id not allowed" })
    }


  }

  export default connectDb(handler);