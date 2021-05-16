const mongoose = require('mongoose');



const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://ashish:testing123@restaurantmernstack.tyvue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
       { useNewUrlParser: true,
        useUnifiedTopology: true});
    console.log('DB connection success');
    }catch(err){
        console.log(err);
    }
};

module.exports = connectDB;