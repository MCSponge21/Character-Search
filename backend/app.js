const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/router');

app.use(express.json());
app.use(cors());
app.use('/api', Router);

app.listen(4000, () =>{
    console.log("Listening to server on port 4000");
});