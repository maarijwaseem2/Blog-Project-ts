import { Request, Response } from 'express';
import { AppDataSource } from '../database/db.config';
import { Comment } from '../entites/Comment';
import { User } from '../entites/User';
import { BlogPost } from '../entites/BlogPost';
import {AuthenticatedRequest} from './types'

// Create a new comment
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // const userId: number = parseInt(req.params.userId);
        const userIdString: string | undefined  = (req.userData?.userId);
        if (!userIdString) {
            return res.status(400).json({ message: 'User ID is missing in the request' });
        }
        const userId: number = parseInt(userIdString);
        const postId: number = parseInt(req.params.postId);

        if (isNaN(userId) || isNaN(postId)) {
            return res.status(400).json({ message: 'Invalid userId or postId' });
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{id:userId}});

        if (req.body.userId && req.body.userId !== userId || req.body.moderator == false ) {
            throw 'Invalid user ID';
          } 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const blogPost = await blogPostRepository.findOne({where:{id:postId}});

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const { content } = req.body;
        const commentRepository = AppDataSource.getRepository(Comment);

        const newComment = new Comment();
        newComment.content = content;
        newComment.user = user;
        newComment.post = blogPost;

        await commentRepository.save(newComment);

        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const comments = await commentRepository.find();

        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single comment by ID
export const getCommentById = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const commentRepository = AppDataSource.getRepository(Comment);
        const comment = await commentRepository.findOne({where:{id:id}});

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ comment });
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a comment by ID
export const updateComment = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // const id: number = parseInt(req.params.id);
        const userId: number = parseInt(req.userData?.userId || "");
        const commentId: number = parseInt(req.params.id);
        console.log('User ID:', userId);

        const { content } = req.body;
        const commentRepository = AppDataSource.getRepository(Comment);
        let comment = await commentRepository.findOne({where:{id:commentId},relations: ['user']});

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (!comment.user || comment.user.id !== userId) {
            console.log('Unauthorized access');
            return res.status(403).json({ message: 'Unauthorized to Update this blog post' });
        }

        comment.content = content;
        await commentRepository.save(comment);

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a comment by ID
export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // const id: number = parseInt(req.params.id);
        const userId: number = parseInt(req.userData?.userId || "");
        const commentId: number = parseInt(req.params.id);
        console.log('User ID:', userId);
        const commentRepository = AppDataSource.getRepository(Comment);
        const comment = await commentRepository.findOne({
            where:{id:commentId},relations:['user']});
            console.log('Blog Post:', comment);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (!comment.user || comment.user.id !== userId) {
            console.log('Unauthorized access');
            return res.status(403).json({ message: 'Unauthorized to delete this blog post' });
        }

        await commentRepository.remove(comment);

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
