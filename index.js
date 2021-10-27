require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 6666;


// import ytitems route
const ytRouter = require('./routes/ytitems');


// Middlewares
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send("FreeDecibel API Home");
});

// Route Middlewares
app.use('/ytitems', ytRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});