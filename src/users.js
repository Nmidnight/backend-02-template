const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'users.json');

function getUsers(callback) {
    fs.readFile(usersFilePath, 'utf8', (error, data) => {
        if (error) {
            callback(error);
            return;
        }

        callback(null, data);
    });
}

module.exports = { getUsers };
