const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourmodel');
const User = require('../../models/usermodel');
const Review = require('../../models/reviewmodel')

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB connection succesful'));

// READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave : false } );
        await Review.create(reviews);
        console.log('Data Loaded Successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// DELETE DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data Deleted Successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if(process.argv[2] === '--import') {
    importData();
}
else if(process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);