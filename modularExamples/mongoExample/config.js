module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:' + PORT,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://root:toor@comp1800-wninv.azure.mongodb.net/test?retryWrites=true&w=majority"
}
