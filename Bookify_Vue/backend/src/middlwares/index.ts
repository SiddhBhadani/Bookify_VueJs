import { Request, Response, NextFunction } from 'express';
import { getMongoRepository } from 'typeorm';
import { User } from '../entities/User.entity'; // Update the path based on your project structure
import { ObjectId } from 'mongodb';
const jwt = require("jsonwebtoken");

const authenticate = async (req: any, res: any, next: any) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Received Token:', token);

    // Verify the token
    const decoded: any = jwt.verify(token, 'loda');

    const userRepository = getMongoRepository(User);
    const user = await userRepository.findOne({where : { _id: new ObjectId( decoded._id) }});

    if (!user) {
      throw new Error();
    }
    
    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const authorize = (...allowedRoles:any) => {
    return (req:any, res:any, next:any) => {
      const userAccessLevel = req.user.accessLevel;
  
      // Check if the user's access level is in the allowedRoles array
      if (allowedRoles.includes(userAccessLevel) || userAccessLevel === 'admin') {
        // User has the required access level
        next();
      } else {
        // User does not have the required access level
        res.status(403).send({ error: 'Access denied' });
      }
    };
  };

export default {authenticate , authorize};
