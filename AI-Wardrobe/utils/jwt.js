// utils/jwt.js
import jwt from 'jsonwebtoken';

export const JWT_SECRET = '$#@!AI_WARDROBE_SECRET_2025';

export const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token无效或已过期');
  }
};