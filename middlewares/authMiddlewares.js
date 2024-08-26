const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const { token } = req.cookies;

    try {
        if(!token) {
            throw new Error("Авторизируйтесь при обновлении страницы");
        }
    
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = {payload: payload, token: token};
    
        next();
    }
    catch(err) {
        console.log(err.message);
    }
};

module.exports = {
    auth,
}
