import { generateAccessToken } from "../services/authToken.service.js";

export const createToken = (req, res) => {
  const subject = req.body?.subject?.trim() || "api-client";
  const access = generateAccessToken(subject);

  return res.status(201).json({
    success: true,
    message: "Token genere avec succes.",
    data: access,
  });
};
