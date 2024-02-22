import { Request, Response } from 'express';
import { AppDataSource } from '../database/db.config';
import { User } from '../entites/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require("dotenv").config();

// Signup function
export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({ where: {email:req.body.email}});
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = userRepository.create({
            email,
            password: hashedPassword
        });
        await userRepository.save(newUser);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login function
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{ email:req.body.email} });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ message: "JWT secret key is not defined" });
          }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// // delete User 
// export const delete = async (req: Request, res: Response) => {
//     const userId = req.params.id;

//     try {
//         // Find the user by ID
//         const userRepository = AppDataSource.getRepository(User);
//         const user = await userRepository.findOne({where:{ id:req.body.id}});

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Delete the user
//         await userRepository.remove(user);

//         res.status(200).json({ message: 'User deleted' });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
