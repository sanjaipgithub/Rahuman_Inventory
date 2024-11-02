const bcrypt = require('bcrypt');
const User = require('../Model/UserModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hi this is my key"  

exports.register = async (req, res) => {
    try {
        console.log(req)
        const { username , email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

                const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if required fields are provided
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Validate password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create JWT payload
      const payload = { userId: user._id }; // Include user ID in payload
  
      // Generate JWT token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Set token expiry
  
      res.status(200).json({
        message: 'Login successful',
        token, // Send the generated JWT token in the response
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };