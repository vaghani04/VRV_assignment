import jwt from "jsonwebtoken";

const roleMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "User is unauthenticated!",
      });
    }

    try {
      const decodedTokenData = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = decodedTokenData;
      // check role which is user has and needed for authorization
      if (decodedTokenData.role != role) {
        return res.status(401).json({
          message: "Access Denied!",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "internal server error!",
      });
    }
  };
};

export default roleMiddleware;
