const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  adminPhone: String,
  location: String,
  bids:[Number],
  type: String,
  startingPrice: Number,
  images:[
  {
    public_id:{
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    }
}
],
  endDate: String
});



const CarModel = mongoose.model('cars', carSchema);

module.exports = CarModel;