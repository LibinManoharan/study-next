const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const samplePath = path.join(__dirname, 'env.sample');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else if (fs.existsSync(samplePath)) {
    dotenv.config({ path: samplePath });
}

async function inspect() {
    // Try both root with empty and root with root
    const configs = [
        { host: process.env.DB_HOST || 'localhost', user: 'root', password: '', database: process.env.DB_NAME || 'gst' },
        { host: process.env.DB_HOST || 'localhost', user: 'root', password: 'root', database: process.env.DB_NAME || 'gst' }
    ];

    for (const config of configs) {
        console.log(`Checking config: user=${config.user}, pass="${config.password}", db=${config.database}`);
        try {
            const conn = await mysql.createConnection(config);
            console.log('SUCCESS! Connected.');
            
            const [columns] = await conn.query(`DESCRIBE users`);
            console.log('Columns in "users" table:');
            columns.forEach(col => console.log(` - ${col.Field} (${col.Type})`));
            
            const [users] = await conn.query('SELECT * FROM users LIMIT 1');
            if (users.length > 0) {
                console.log('Sample user record keys:', Object.keys(users[0]));
            } else {
                console.log('No users found in table.');
            }
            
            await conn.end();
            return; // Exit on first success
        } catch (err) {
            console.log(`FAILED: ${err.message}`);
        }
    }
}

inspect();
