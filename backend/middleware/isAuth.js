import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "User is unauthorized. Token not found."
      });
    }

    const validateToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!validateToken) {
      return res.status(401).json({
        message: "User does not have a valid token."
      });
    }

    req.userId = validateToken.userId;
    next();

  } catch (error) {
    return res.status(500).json({
      message: `isAuth error: ${error.message}`
    });
  }
};

export default isAuth;
