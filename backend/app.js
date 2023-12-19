const express = require('express');
const cors = require('cors');
const app = express();

// Other imports and middleware...

// Add these lines before your routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));;

app.use(cors());

const signupRouter = require('./signup');
app.use('/', signupRouter);
// Use the login router
const loginRouter = require('./login');
app.use('/', loginRouter); // Change this line to use '/login' instead of '/'
const reportitemRouter = require('./reportitem');
app.use('/',reportitemRouter);


// Start the server
const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on:${PORT}`));
