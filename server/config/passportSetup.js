
// --testing--

const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const passportCookie = require('passport-cookie');

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback",
//     scope: ["profile", "email"]
// }, async (accessToken, refreshToken, profile, done) => {
//     const newUser = {
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile.photos[0].value
//     };

//     try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//             user = await User.create(newUser);
//         }

//         done(null, user);



//     } catch (err) {
//         console.error(err);
//         done(err, null);
//     }
// }));


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
    };

    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create(newUser);
        }

        // Generate the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Attach token to user object
        user.token = token;
        // console.log(user)
        done(null, user);

    } catch (err) {
        console.error(err);
        done(err, null);
    }
}));





 const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000 // 1 hour in milliseconds
    });
    console.log(`Token generated and cookie set for user ID: ${user._id} ,${token}`);
};

// exports.signup = async (req, res) => {
//     try {
//         const { displayName, email, password } = req.body;

//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = new User({ displayName, email, password: hashedPassword });
//         await user.save();

//         generateTokenAndSetCookie(user, res);

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         generateTokenAndSetCookie(user, res);

//         res.status(200).json({ message: "Logged in successfully" });
//         // console.log(res)
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

exports.signup = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ displayName, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(201).json({ message: "User registered successfully", token: token,user:user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(201).json({ message: "Logged in successfully", token: token,user:user });
        console.log(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.logout = (req, res) => {
    try {
        res.clearCookie('token'); // Clear the token cookie

        req.logout((err) => { // Passport's logout method
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Logout failed" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



exports.generateTokenAndSetCookie = generateTokenAndSetCookie;



