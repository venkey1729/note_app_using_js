const jwt = require('jsonwebtoken');
const secretKey = '7b5b88d273481806daaf29ff16ed29b8628ccc32b2af88ad62ab64f434282526b015d82873d80b2e0cd988b15b1da17493a47545c2ee6f50b0696aa029c35a42'; // Replace with your actual secret key

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
