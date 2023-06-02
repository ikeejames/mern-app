const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String }
});


module.exports = mongoose.model('Friends', FriendSchema);
