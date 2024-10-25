const express = require('express');
const jwt = require('jsonwebtoken'); // Assuming used for login

const router = express.Router();

router.post('/login', (req, res) => {
  const {username, password} = req.body

  console.log(username, password)

  if (username === 'admin' && password === 'password') {
    const secretKey = 'your_secret_key'; // JWT Secret
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else 
  res.status(401).json({ message: 'Invalid credentials' });
    
});

module.exports = router;