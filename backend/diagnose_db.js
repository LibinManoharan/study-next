const mysql = require('mysql2/promise');

async function diagnose() {
    const hosts = ['127.0.0.1', 'localhost'];
    const ports = [3306, 3307, 3308];
    const passwords = ['', 'root'];

    for (const host of hosts) {
        for (const port of ports) {
            for (const password of passwords) {
                console.log(`Trying ${host}:${port} as root with pass "${password}"...`);
                try {
                    const connection = await mysql.createConnection({
                        host, port, user: 'root', password,
                        connectTimeout: 2000
                    });
                    console.log(`SUCCESS! Connected to ${host}:${port}`);
                    const [rows] = await connection.query('SHOW DATABASES');
                    console.log('Databases:', rows.map(r => r.Database || Object.values(r)[0]).join(', '));
                    await connection.end();
                    return;
                } catch (err) {
                    console.log(`FAILED: ${err.message}`);
                }
            }
        }
    }
}

diagnose();
