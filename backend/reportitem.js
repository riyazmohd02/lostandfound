const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { validationResult, check } = require('express-validator');
const connection = require("./dbconnection");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

