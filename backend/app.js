const express = require('express');
const cors = require('cors');
const app = express();

// Other imports and middleware...

// Add these lines before your routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));;

app.use(cors());

const signupRouter = require('./signup');
const loginRouter = require('./login');
const reportitemRouter = require('./reportitem');
const questionformRouter = require('./question');



app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', reportitemRouter);
app.use('/', questionformRouter);


// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on:${PORT}`)
});
