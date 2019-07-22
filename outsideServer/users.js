const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    user: String,
    mail: String,
    password: String,
    description: String
});

const user_model = mongoose.model('User', userSchema);

module.exports = {
    user_model
};
