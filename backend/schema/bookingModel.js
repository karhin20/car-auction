const mongoose = require("mongoose");



const bookingSchema = new mongoose.Schema({
  
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  bidAmount: { type: Number, required: true },
}, { timestamps: true });

const BookingModel = mongoose.model('bookings', bookingSchema);

module.exports = BookingModel;