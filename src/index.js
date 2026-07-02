require('dotenv').config();

const connectDB = require('./config/database');
const app = require('./app');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3005;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running at http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

startServer();
