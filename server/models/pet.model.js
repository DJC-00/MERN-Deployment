//  Pet.model.js
const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
  name: {
		type:String,
        required:[true,"Pet Name is Required"],
        minlength: [3,"Name must contain at least 3 characters"],
        unique: true
			},

  type: {
    type:String,
        required:[true,"Pet type is Required"],
        minlength: [3,"Name must contain at least 3 characters"],
      },

  desc: {
    type:String,
        required:[true,"Pet description is Required"],
        minlength: [3,"Name must contain at least 3 characters"],
      },

  skills: {
    type: [{
      type: String,
  }],
  validate: [arrayLimit, '{PATH} exceeds the limit of 3']
}
}, {timestamps:true});

function arrayLimit(val) {
  return val.length <= 3;
}

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet 