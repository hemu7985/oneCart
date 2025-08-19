import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
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
        req.adminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        return res.status(500).json({
            message: `adminAuth error: ${error.message}`
        });
    }
};

export default adminAuth;