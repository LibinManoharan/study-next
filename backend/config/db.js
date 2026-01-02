const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to load .env, fallback to env.sample
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    const samplePath = path.join(__dirname, '../env.sample');
    if (fs.existsSync(samplePath)) {
        dotenv.config({ path: samplePath });
    }
}

const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'my_app_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/my_app_logs');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const initMySQL = async () => {
    try {
        const connection = await mysqlPool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                USER_ID INT AUTO_INCREMENT PRIMARY KEY,
                USERNAME VARCHAR(64) NOT NULL,
                FIRSTNAME VARCHAR(128) NULL,
                LASTNAME VARCHAR(128) NULL,
                EMAIL VARCHAR(128) NULL UNIQUE,
                EMAIL_VERIFIED int default 0 comment '0=not verified, 1=verified',
                DATE_OF_BIRTH DATE NULL,
                GENDER VARCHAR(64) NULL,
                IP_ADDRESS VARCHAR(64) NULL,
                USER_LAST_LOGIN datetime NULL,
                CONTACT VARCHAR(64) NULL UNIQUE,
                CONTACT_VERIFIED int default 0 comment '0=not verified, 1=verified',
                OLD_PASSWORD VARCHAR(255) NULL,
                PASSWORD VARCHAR(255) NOT NULL,
                AVATAR VARCHAR(64) NULL,
                THEME VARCHAR(64) NULL,
                LOGIN_STATUS int default 0 comment '0=not logged in, 1=logged in',
                STATUS int default 1 comment '0=inactive, 1=active',
                CREATED_BY VARCHAR(64) NULL,
                CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UPDATED_BY VARCHAR(64) NULL,
                UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        connection.release();
        console.log('MySQL Users table initialized/verified');
    } catch (err) {
        console.error('MySQL initialization error:', err);
    }
};

module.exports = { mysqlPool, connectMongoDB, initMySQL };
