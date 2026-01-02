const { mysqlPool } = require('../config/db');

class User {
    static async create(userData) {
        const {
            username, firstname, lastname, email, emailVerified, dob, gender, ipAddress,
            userLastLogin, contact, contactVerified, oldPassword, password, avatar, theme,
            loginStatus, status, createdBy, updatedBy
        } = userData;

        const [result] = await mysqlPool.execute(
            `INSERT INTO users (
                USERNAME, FIRSTNAME, LASTNAME, EMAIL, EMAIL_VERIFIED, DATE_OF_BIRTH, GENDER,
                IP_ADDRESS, USER_LAST_LOGIN, CONTACT, CONTACT_VERIFIED, OLD_PASSWORD, PASSWORD,
                AVATAR, THEME, LOGIN_STATUS, STATUS, CREATED_BY, UPDATED_BY
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username, firstname, lastname, email, emailVerified, dob, gender,
                ipAddress, userLastLogin, contact, contactVerified, oldPassword, password,
                avatar, theme, loginStatus, status, createdBy, updatedBy
            ]
        );
        return result.insertId;
    }

    static async findByIdentifier(identifier) {
        const [rows] = await mysqlPool.execute(
            'SELECT * FROM users WHERE EMAIL = ? OR USERNAME = ?',
            [identifier, identifier]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await mysqlPool.execute(
            'SELECT * FROM users WHERE EMAIL = ?',
            [email]
        );
        return rows[0];
    }
    
    static async findById(id) {
        const [rows] = await mysqlPool.execute(
            'SELECT * FROM users WHERE USER_ID = ?',
            [id]
        );
        return rows[0];
    }
}

module.exports = User;
