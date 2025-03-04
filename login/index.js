// login/index.js
const auth = require('../auth');

module.exports = async function (context, req) {
    context.log('Login function processed a request.');

    if (req.method !== 'POST') {
        return {
            status: 405,
            body: { error: "Method not allowed" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    
    const { username, password } = req.body || {};
    
    if (!username || !password) {
        return {
            status: 400,
            body: { error: "Username and password are required" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    
    try {
        const result = await auth.login(username, password);
        
        if (!result) {
            return {
                status: 401,
                body: { error: "Invalid credentials" },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        return {
            status: 200,
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log.error('Login error:', error);
        
        return {
            status: 500,
            body: { error: "Internal server error" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};