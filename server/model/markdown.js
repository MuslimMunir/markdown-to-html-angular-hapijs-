'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @module  User
 * @description contain the details of user  
 */

var MarkdownSchema = new Schema({

    /* 
      markdown. It can only contain string, is required field.
    */
    markdown: {
        type: String,
        required: true
    },
    /* 
        html. It can only contain string, is required field.
      */
    html: {
        type: String,
        required: true
    },
    //created date
    date: {
        type: Date,
        default: Date.now,
        required: true
    },

});



MarkdownSchema.statics.getAll = function(callback) {
    this.find({}).sort({
        'date': -1
    }).exec(callback);
};

MarkdownSchema.statics.get = function(id, callback) {
    this.findOne({'_id': id}, callback);
};



MarkdownSchema.statics.createMarkdown = function(requestData, callback) {
    this.create(requestData, callback);
};


var markdown = mongoose.model('markdown', MarkdownSchema);

/** export schema */
module.exports = {
    Markdown: markdown
};