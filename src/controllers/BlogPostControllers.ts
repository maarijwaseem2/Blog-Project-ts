import { Request, Response } from 'express';
import { AppDataSource } from '../database/db.config';
import { BlogPost } from '../entites/BlogPost';
import { User } from '../entites/User';

export const createBlogPost = async (req: Request, res: Response) => {
    try {
        const userId:number = +req.params.id;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where:{id:userId}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { title, content } = req.body;

        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const newBlogPost = new BlogPost();
        newBlogPost.title = title;
        newBlogPost.content = content;
        newBlogPost.author = user;

        await blogPostRepository.save(newBlogPost);

        res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const blogPosts = await blogPostRepository.find();

        res.status(200).json({ blogPosts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const  id:number  = parseInt(req.params.id);
        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const blogPost = await blogPostRepository.findOne({where:{id}}); 

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ blogPost });
    } catch (error) {
        console.error('Error fetching blog post by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a blog post by ID
export const updateBlogPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const  id:number  = parseInt(req.params.id);
    try {
        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const blogPost = await blogPostRepository.findOne({where: {id}});

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        blogPost.title = title;
        blogPost.content = content;

        await blogPostRepository.save(blogPost);

        res.status(200).json({ message: 'Blog post updated successfully', blogPost });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a blog post by ID
export const deleteBlogPost = async (req: Request, res: Response) => {

    try {
        const  id:number  = parseInt(req.params.id);
        const blogPostRepository = AppDataSource.getRepository(BlogPost);
        const blogPost = await blogPostRepository.findOne({where:{id}});

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        await blogPostRepository.remove(blogPost);

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
