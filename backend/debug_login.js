const User = require('./models/User');
const { connectMongoDB, initMySQL } = require('./config/db');
const bcrypt = require('bcryptjs');

async function test() {
    try {
        await connectMongoDB();
        await initMySQL();

        const identifier = 'test@test.com'; // Change this to a real user if you know one
        console.log('Searching for user:', identifier);
        const user = await User.findByIdentifier(identifier);
        
        if (!user) {
            console.log('User not found');
            return;
        }

        console.log('User found:', JSON.stringify(user, null, 2));
        
        const password = 'password'; // Change this
        const hash = user.PASSWORD || user.password;
        console.log('Hash from DB:', hash);
        
        if (!hash) {
            console.log('No password hash found for user');
            return;
        }

        const isMatch = await bcrypt.compare(password, hash);
        console.log('Password match:', isMatch);

    } catch (error) {
        console.error('Debug Error:', error);
    } finally {
        process.exit();
    }
}

test();
