const jwt = require("jsonwebtoken");

const generateJWT = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET)
};

function generateNumber() {
    return Math.floor(1000 + Math.random()*9000);
}

module.exports = {
    generateJWT,
    generateNumber
}
