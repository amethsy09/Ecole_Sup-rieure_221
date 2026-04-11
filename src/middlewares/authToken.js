import { validateAccessToken } from "../services/authToken.service.js";

const extractBearerToken = (authorizationHeader = "") => {
  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token.trim();
};

const authToken = (req, res, next) => {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Vous devez vous conecter",
    });
  }

  const validation = validateAccessToken(token);
  if (!validation.valid) {
    return res.status(401).json({
      success: false,
      message: "Token invalide.",
    });
  }

  req.auth = {
    isAuthenticated: true,
    subject: validation.subject,
    expiresAt: validation.expiresAt,
  };
  return next();
};

export default authToken;
