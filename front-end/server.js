const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// bodyparser middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
//jun
app.use('/api/preferences', require('./routes/api/preferences'));

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server started on the port ${port}`));

// see below vedio for deployment
// https://www.youtube.com/watch?v=71wSzpLyW9k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=8