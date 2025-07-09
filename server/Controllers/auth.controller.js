const User = require('../Models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json(
                {
                    message: "User already exists",
                    success: false
                }
            )
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: HashedPassword
        })
        await newUser.save();
        return res.status(201).json({
            message: "User Signup successfully",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error, User Signup failed",
            success: false,
            error: error.message
        })
    }
}

const signinUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json(
                {
                    message: "failed to Login, User not found",
                    success: false
                }
            )
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "failed to Login, Invalid Password",
                success: false
            })
        }
        // jwt token generation can be added here
        const jwtToken = jwt.sign({
                userid: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10h'
            }
        )

        res.status(200).json({
            message: "Logged in successfully",
            success: true,
            jwtToken: jwtToken,
            userid: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error, User Signin failed",
            success: false,
            error: error.message
        })
    }
}

const getUser = async (req, res) => {
    console.log("Get user controller called");
    res.send("Get user controller called");
}


const deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;

        const user = await User.findByIdAndDelete(userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

module.exports = {
    signupUser,
    signinUser,
    getUser,
    deleteUser
}