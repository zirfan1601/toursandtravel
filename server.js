const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB connection succesful'));

const port = 3000;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
