const bookSchema = require('../models/Book')

module.exports = {
    //Get All Books
    get: (req, res) => {
        bookSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
    },

    //Create a Book
    post: (req, res) => {
        const book = bookSchema(req.body)
        book.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
    },

    //Get book by id
    getOne: (req, res) => {
        const { id } = req.params
        bookSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
    },

    //Update a book
    put: (req, res) => {
        const { id } = req.params
        const { title, author, edition } = req.body
        bookSchema
        .updateOne({ _id: id}, { $set: {title, author, edition} })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
    },

    //Delete a book
    delete: (req, res) => {
        const { id } = req.params
        bookSchema
        .remove({ _id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
    },
}