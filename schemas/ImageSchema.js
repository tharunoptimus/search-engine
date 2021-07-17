const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
	url: { type: String, required: true, trim: true },
	alt: { type: String, trim: true },
    
});
ImageSchema.index({url: 'text', alt: 'text'});

var Image = mongoose.model('Image', ImageSchema)
module.exports = Image;