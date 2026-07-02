const Book = require('../models/Book');

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.book_id);

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.book_id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.book_id);

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
