const User = require('../models/User');
const Book = require('../models/Book');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.user_id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.user_id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getBorrowedBooks = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id).populate('borrowedBooks');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user.borrowedBooks);
    } catch (error) {
        next(error);
    }
};

const borrowBook = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id);
        const book = await Book.findById(req.params.book_id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        const alreadyBorrowed = user.borrowedBooks.some(
            (bookId) => bookId.toString() === req.params.book_id,
        );

        if (alreadyBorrowed) {
            res.status(400).json({ message: 'Book already borrowed by this user' });
            return;
        }

        user.borrowedBooks.push(book._id);
        await user.save();

        res.status(201).json({
            user_id: user._id,
            book_id: book._id,
        });
    } catch (error) {
        next(error);
    }
};

const returnBook = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const bookIndex = user.borrowedBooks.findIndex(
            (bookId) => bookId.toString() === req.params.book_id,
        );

        if (bookIndex === -1) {
            res.status(404).json({ message: 'Book not found in user borrowed list' });
            return;
        }

        user.borrowedBooks.splice(bookIndex, 1);
        await user.save();

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getBorrowedBooks,
    borrowBook,
    returnBook,
};
