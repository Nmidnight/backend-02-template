const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        res.status(404).json({ message: 'Resource not found' });
        return;
    }

    if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
        return;
    }

    if (err.code === 11000) {
        res.status(400).json({ message: 'Username already exists' });
        return;
    }

    res.status(500).json({ message: err.message || 'Internal server error' });
};

module.exports = errorHandler;
