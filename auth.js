// auth.js
const jwt = require('jsonwebtoken');
const { getUserByCredentials } = require('./database');

// Secret key for JWT (in a production environment, this should be in environment variables)
// Note: As per requirements, we're not signing the JWT (not recommended for production)
const JWT_SECRET = 'your-secret-key';

/**
 * Authenticates a user with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string}|null>}
 */
async function login(username, password) {
    const user = await getUserByCredentials(username, password);
    
    if (!user) {
        return null;
    }
    
    // Create JWT token
    const token = jwt.sign(
        { 
            userId: user.id,
            role: user.role 
        }, 
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    
    return { token };
}

/**
 * Verifies a JWT token
 * @param {string} token
 * @returns {object} Decoded token payload
 */
function verifyToken(token) {
    // As per requirements, we're not verifying the signature
    // In a real application, you should ALWAYS verify signatures
    return jwt.decode(token);
}

module.exports = {
    login,
    verifyToken
};