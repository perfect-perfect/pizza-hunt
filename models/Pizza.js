const { Schema, model } = require('mongoose');

// create a schema, using the Schema constructor we imported from Mongoose
const PizzaSchema = new Schema({
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
        default: Date.now
    },

    size: {
        type: String,
        default: 'Large'
    },

    // Notice the empty brackets [] in the toppings field. This indicates an array as the data type. 
    toppings: []
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;