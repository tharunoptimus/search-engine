const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SitesSchema = new Schema({
	url: { type: String, required: true, trim: true },
	title: { type: String, required: true, trim: true },
	description: { type: String, trim: true },
	keywords: { type: String, trim: true }
    
});
SitesSchema.index({url: 'text', title: 'text', description: 'text', keywords: 'text'});

var Site = mongoose.model('Site', SitesSchema)
module.exports = Site;