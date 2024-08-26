const jwt = require("jsonwebtoken");

const generateJWT = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET)
};

module.exports = {
    generateJWT,
}
