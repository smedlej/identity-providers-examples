"use strict";

const assert = require('assert');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();

mongoose.connect('mongodb://test:nT6SsG2MfvHH@ds129386.mlab.com:29386/fi', { useMongoClient: true })
.then(() => app.listen(process.env.PORT || 8001))
.then(() => {
  console.log('mongoose connected');
  console.log('app listening on :', process.env.PORT || 8001);
})
.catch((err) => console.log(err))
