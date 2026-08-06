const jwt = require("jsonwebtoken");

module.exports = (id) => {

    return jwt.sign(

        {

            user: {

                id

            }

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "5d"

        }

    );

};