var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
        ,ref: 'User'
    }
    , dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'dish' } ] 
}
, {
    timestamps : true
}                           
); 

var Favourite = mongoose.model('Favorite', favouriteSchema);

module.exports = Favourite;