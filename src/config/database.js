const mongoose = require('mongoose');

const connectToDatabase = () => {
    const url = 'mongodb://localhost:27017/vending_machine?rs=rs0'
	return mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false  } )
};

module.exports = connectToDatabase
