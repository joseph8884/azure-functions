// File structure:
// - index.js (main entry point)
// - auth.js (authentication utilities)
// - endpoints.js (API endpoint handlers)
// - database.js (mock database)
// - function.json (Azure Functions configuration)
// - package.json (project dependencies)
// - openapi.json (OpenAPI specification)

// index.js
const auth = require('../auth');
const endpoints = require('../endpoints');
const { getUserById } = require('../database');

module.exports = async function (context, req) {
    context.log('Processing HTTP request');
    
    // Route requests based on the URL path
    const path = req.params.path || '';
    
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            status: 401,
            body: { error: "Unauthorized: Missing or invalid token" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    
    // Extract and verify JWT token
    const token = authHeader.split(' ')[1];
    try {
        const decoded = auth.verifyToken(token);
        const user = await getUserById(decoded.userId);
        
        if (!user) {
            return {
                status: 401,
                body: { error: "Unauthorized: Invalid user" },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        // Route to appropriate endpoint handler
        let result;
        if (path === 'user1-endpoint' && user.role === 'user1') {
            result = await endpoints.handleUser1Endpoint(req, user);
        } else if (path === 'user2-endpoint' && user.role === 'user2') {
            result = await endpoints.handleUser2Endpoint(req, user);
        } else if (path === 'shared-endpoint') {
            result = await endpoints.handleSharedEndpoint(req, user);
        } else {
            result = {
                status: 403,
                body: { error: "Forbidden: You don't have access to this endpoint" },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        return result;
    } catch (error) {
        context.log.error('Token verification failed:', error);
        return {
            status: 401,
            body: { error: "Unauthorized: Invalid token" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};