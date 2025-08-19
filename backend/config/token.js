import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token; // ✅ correct return
  } catch (error) {
    console.log("token error", error);
    return null; // Optional: return null on error
  }
};



const genToken1 = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token; // ✅ correct return
  } catch (error) {
    console.log("token error", error);
    return null; // Optional: return null on error
  }
};

export default genToken;

