const env = process.env;

const config = {
    MONGO_IP: env.MONGO_IP || "mongo",
    MONGO_PORT: env.MONGO_PORT || 27017,
    MONGO_USER: env.MONGO_USER,
    MONGO_PASSWORD: env.MONGO_PASSWORD,
    MONGO_DB_NAME: env.MONGO_DB_NAME,
    MONGO_CLUSTER: env.MONGO_CLUSTER,
    NODE_ENV: env.NODE_ENV,
    JWT_SECRET: env.JWT_SECRET,
    S3_SECRET_ACCESS_KEY: env.S3_SECRET_ACCESS_KEY,
    S3_ACCESS_KEY_ID: env.S3_ACCESS_KEY_ID,
    S3_BUCKET_NAME: env.S3_BUCKET_NAME,
    SMTP_HOST: env.SMTP_HOST,
    SMTP_PORT: env.SMTP_PORT,
    SMTP_USER: env.SMTP_USER,
    SMTP_PASSWORD: env.SMTP_PASSWORD
};

module.exports = config;