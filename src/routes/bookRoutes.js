const { Router } = require('express');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

const router = Router();

router.get('/', getAllBooks);
router.get('/:book_id', getBookById);
router.post('/', createBook);
router.put('/:book_id', updateBook);
router.delete('/:book_id', deleteBook);

module.exports = router;
