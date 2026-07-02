const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getBorrowedBooks,
    borrowBook,
    returnBook,
} = require('../controllers/userController');

const router = Router();

router.get('/', getAllUsers);
router.get('/:user_id/books', getBorrowedBooks);
router.post('/:user_id/books/:book_id', borrowBook);
router.delete('/:user_id/books/:book_id', returnBook);
router.get('/:user_id', getUserById);
router.post('/', createUser);
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);

module.exports = router;
