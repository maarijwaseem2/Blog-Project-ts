import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface UserRequire extends Request {
  email: string;
  userId: string;
}

interface AuthenticatedRequest extends Request {
  userData?: UserRequire;
}

const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization header is missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as Secret) as UserRequire & JwtPayload;
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

export default checkAuth;