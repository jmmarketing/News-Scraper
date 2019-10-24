var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
    text: {
        type: String,
        trim: true,
        minlength: 1
    }

});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note; 