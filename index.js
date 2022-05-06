const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("My code is running for the first time");
});

app.listen(port, ()=>{
    console.log('My code is listening as', port);
});