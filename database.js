// database.js
// This is a mock database module for demonstration purposes
// In a real application, you would use a proper database like CosmosDB, MongoDB, etc.

// Hardcoded users as specified in the requirements
const users = [
    {
        id: '1',
        username: 'user1',
        password: 'password1',
        role: 'user1',
        name: 'User One'
    },
    {
        id: '2',
        username: 'user2',
        password: 'password2',
        role: 'user2',
        name: 'User Two'
    }
];

/**
 * Finds a user by their credentials
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object|null>}
 */
async function getUserByCredentials(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Return a copy of the user without the password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

/**
 * Finds a user by their ID
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
async function getUserById(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        // Return a copy of the user without the password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

module.exports = {
    getUserByCredentials,
    getUserById
};