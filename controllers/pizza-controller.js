const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    // will serve as the callback function for the GET '/api/pizzas' route.
    getAllPizza(req, res) {
        Pizza.find({})
            // populates the comment so we don't just see the comment id
            .populate({
                path: 'comments',
                // so that we can tell Mongoose that we don't care about the __v field on comments either. 
                // If we didn't have it, it would mean that it would return only the __v field.
                select: '-__v'
            })
            //  telling mongoose we do not want the pizza's '__v' value
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // get one pizza by id
    // Instead of accessing the entire req, we've destructured params out of it, because that's the only data we need
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create pizza, POST to '/api/pizzas'
    createPizza ({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza by id, PUT to '/api/pizzas/:id'
    // Mongoose finds a single document (row) we want to update and updates it
    // If we don't set that third parameter, '{ new: true }', it will return the original document
    //  - By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
    //  - the 'where' clause is used first, (_id: params.id) then the updated data, then options for how the data should be returned.
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params}, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;
