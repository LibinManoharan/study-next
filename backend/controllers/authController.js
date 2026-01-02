const User = require('../models/User');
const Log = require('../models/Log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        // Extract fields. For fields not provided, we can use defaults or simple placeholders for now.
        // Assuming frontend will eventually provide these, or we set defaults here.
        const { 
            username, email, password, 
            firstname, lastname, dob, gender, contact 
        } = req.body;

        if (!username || !email || !password || !firstname || !lastname || !dob || !gender || !contact) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare full user object for the new schema
        const newUser = {
            username,
            firstname,
            lastname,
            email,
            emailVerified: '0', // Default not verified
            dob,
            gender,
            ipAddress: req.ip || '0.0.0.0',
            userLastLogin: new Date().toISOString(), // Or just a timestamp string
            contact,
            contactVerified: '0',
            oldPassword: '', // Default empty
            password: hashedPassword,
            avatar: 'default.png', // Default avatar
            theme: 'default', // Default theme
            loginStatus: 0,
            status: 1,
            createdBy: 'system', // or self
            updatedBy: 'system'
        };

        const userId = await User.create(newUser);

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // Changed email to identifier

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Please provide username/email and password' });
        }

        const user = await User.findByIdentifier(identifier); // Use new method
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password using the column name from DB (PASSWORD)
        const isMatch = await bcrypt.compare(password, user.PASSWORD || user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.USER_ID || user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        // Log the login to MongoDB
        await Log.create({
            userId: (user.USER_ID || user.id).toString(),
            action: 'LOGIN',
            ip: req.ip
        });

        res.json({ 
            token, 
            user: { 
                id: user.USER_ID || user.id, 
                username: user.USERNAME || user.username, 
                email: user.EMAIL || user.email 
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
