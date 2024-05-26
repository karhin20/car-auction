const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dodktkt2p', 
  api_key: '749998383631869', 
  api_secret: process.env.API_SECRET,

});


  module.exports =  cloudinary