const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const locationSchema = new Schema ({
    type: String,
    coordinates: [Number]
})

const placeSchema = new Schema ({
    id: ObjectId,
    location: locationSchema,
    name: String
});
// const placeSchema = new Schema ({
//     id: ObjectId,
//     location: {
//         type: String,
//         coordinates: [
//             Number       //first longitude, second latitude
//         ]
//     },
//     name: String
// });

const place_model = mongoose.model('Place', placeSchema);

module.exports = {
    place_model
};


// {
//     "location": {
//         "type": "Point",
//         "coordinates": [
//             -3.654859,
//             40.464084
//             ]
//     },
//     "name": "parque pinar del rey"
//    }