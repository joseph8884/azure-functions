// endpoints.js
// This module contains handlers for different API endpoints

/**
 * Handler for User1's exclusive endpoint
 * @param {object} req - HTTP request object
 * @param {object} user - Authenticated user object
 * @returns {object} HTTP response
 */
async function handleUser1Endpoint(req, user) {
    return {
        status: 200,
        body: {
            message: "Welcome to User1's exclusive endpoint",
            user: user.name,
            data: {
                exclusive: true,
                role: user.role,
                timestamp: new Date().toISOString()
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

/**
 * Handler for User2's exclusive endpoint
 * @param {object} req - HTTP request object
 * @param {object} user - Authenticated user object
 * @returns {object} HTTP response
 */
async function handleUser2Endpoint(req, user) {
    return {
        status: 200,
        body: {
            message: "Welcome to User2's exclusive endpoint",
            user: user.name,
            data: {
                exclusive: true,
                role: user.role,
                timestamp: new Date().toISOString()
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

/**
 * Handler for shared endpoint (accessible by both users)
 * @param {object} req - HTTP request object
 * @param {object} user - Authenticated user object
 * @returns {object} HTTP response
 */
async function handleSharedEndpoint(req, user) {
    return {
        status: 200,
        body: {
            message: "Welcome to the shared endpoint",
            user: user.name,
            role: user.role,
            data: {
                shared: true,
                timestamp: new Date().toISOString()
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

module.exports = {
    handleUser1Endpoint,
    handleUser2Endpoint,
    handleSharedEndpoint
};