const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if we are running in the cloud (Render automatically sets NODE_ENV to 'production')
if (process.env.NODE_ENV === 'production') {
    
    // Production: Use the Aiven Connection URI and enable SSL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // This is required for secure cloud databases like Aiven
            }
        }
    });

} else {

    // Local Development: Use your exact original setup
    sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASS, 
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false 
        }
    );
}

module.exports = sequelize;