import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("DB Connected")
}).catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = new mongoose.model("User", userSchema);

// app.post('/login', (req, res) => {
//     const {email, password}=req.body;
//     User.findOne({email:email}, (err,user)=>{
//         if(user){
//           if(password=== user.password){
//             res.send({msg:"Login Successfully",user:user});
//           }else{
//              res.send({msg:"Password did't match"});
//           }
//         }else{
//             res.send({msg:"User not registerd"});
//         }
//     })
// })
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        if (user) {
            // Compare hashed passwords
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Passwords match, send success response
                return res.send({ msg: 'Login Successfully', user: user });
            } else {
                // Passwords don't match, send error response
                return res.send({ msg: "Password didn't match" });
            }
        } else {
            // User not found, send error response
            return res.send({ msg: 'User not registered' });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).send({ msg: 'Internal Server Error' });
    }
});

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             res.send({ msg: "User already registered" })
//         } else {
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             user.save(err => {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send({ msg: "Successfully Register" });
//                 }
//             })
//         }
//     })

// })

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.send({ msg: "User already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.send({ msg: "Successfully registered" });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})

