const required = [

    "PORT",

    "JWT_SECRET",

    "MONGO_URI"

];

required.forEach((key) => {

    if (!process.env[key]) {

        throw new Error(

            `Missing Environment Variable: ${key}`

        );

    }

});

const { cleanEnv, str, port } = require("envalid");

module.exports = cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    MONGO_URI: str(),
    GEMINI_API_KEY: str(),
});