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

        if (!email.toLowerCase().endsWith('@gmail.com') || email.toLowerCase().indexOf('@gmail.com') === 0) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        if (password.length < 5) {
            return res.status(401).json({ message: 'At Least password Length 5 character' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{ email:req.body.email} });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ message: "JWT secret key is not defined" });
          }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{id:userId}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    const { email, password } = req.body;
    if (!email.toLowerCase().endsWith('@gmail.com') || email.toLowerCase().indexOf('@gmail.com') === 0) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (password.length < 5) {
        return res.status(401).json({ message: 'At Least password Length 5 character' });
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOne({where:{id:userId}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await userRepository.save(user);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{id:userId}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await userRepository.remove(user);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};