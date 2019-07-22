const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema ({
    id: ObjectId,
    date: Date,
    placeId: ObjectId,
    description: String,
    members: [ObjectId],
    creator: ObjectId
});

const event_model = mongoose.model('Event', eventSchema);

module.exports = {
    event_model
};
