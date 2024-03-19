const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
