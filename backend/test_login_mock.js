const authController = require('./controllers/authController');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Mock User.findByIdentifier
User.findByIdentifier = async (id) => {
    console.log('Mocked findByIdentifier called');
    return {
        // missing USER_ID and id
        USERNAME: 'test',
        EMAIL: 'test@test.com',
        PASSWORD: await bcrypt.hash('password', 10)
    };
};

const req = {
    body: {
        identifier: 'test@test.com',
        password: 'password'
    },
    ip: '127.0.0.1'
};

const res = {
    status: function(code) {
        console.log('Status set to:', code);
        this.statusCode = code;
        return this;
    },
    json: function(data) {
        console.log('JSON response:', JSON.stringify(data, null, 2));
        return this;
    }
};

async function test() {
    console.log('Calling login...');
    try {
        await authController.login(req, res);
    } catch (e) {
        console.error('Caught unexpected error in test script:', e);
    }
}

test();
