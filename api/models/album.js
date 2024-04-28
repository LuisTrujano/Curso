'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title:{type: String},
    description:{type: String} ,
    year:{type: Number},
    image:{type: String} ,
    artist:{type: mongoose.Schema.Types.ObjectId, ref:'Artist',required: true}

});

module.exports = mongoose.model('Album', AlbumSchema);