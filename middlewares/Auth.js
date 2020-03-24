const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     req.isAuth = false;
//     return next();
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token || token === "") {
//     req.isAuth = false;
//     return next();
//   }

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, "different");
//   } catch (error) {
//     req.isAuth = false;
//     return next();
//   }
//   if (!decodedToken) {
//     req.isAuth = false;
//     return next();
//   }

//   req.isAuth = true;
//   // req.userId = decodedToken.userId;
//   next();
// };


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return token;
    const decoded = jwt.verify(token, "cool")
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message:"Auth failed"
    })
  }
}