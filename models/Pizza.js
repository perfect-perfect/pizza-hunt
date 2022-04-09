const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create a schema, using the Schema constructor we imported from Mongoose
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },

        createdBy: {
            type: String
        },

        createdAt: {
            type: Date,
            // we set a default value to the JavaScript 'Date.now' function.
            // If no value is provided in this field when the user creates new data, the Date.now function will be executed and will provide a timestamp.
            default: Date.now,
            // get's alter data before we send it
            // every time we retrieve a pizza, the value in the createdAt field will be formatted by the dateFormat()
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

        size: {
            type: String,
            default: 'Large'
        },

        // Notice the empty brackets [] in the toppings field. This indicates an array as the data type. 
        toppings: [],

        comments: [
            {
                type: Schema.Types.ObjectId,
                // it tells the Pizza model which documents (row) to search to find the right comments.
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            // telling mongoose to use any getter functions we've specified
            getters: true
        },
        // e set 'id' to 'false' because this is a virtual that Mongoose returns, and we don’t need it.
        id: false
    }
);



// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {

    return this.comments.length;

});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;