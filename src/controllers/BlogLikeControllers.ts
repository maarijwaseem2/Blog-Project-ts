import { Request, Response } from 'express';
import { AppDataSource } from '../database/db.config';
import { BlogLike } from '../entites/BlogLike';

export const toggleLikeBlogPost = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const  postId = parseInt(req.params.postId);
    const likeRepository = AppDataSource.getRepository(BlogLike);

    try {
        let like = await likeRepository.findOne({ 
            where: { user: {id:userId}, blogPost: {id:postId } },
        });

        if (like) {
            // If the user has already liked the post, toggle the like
            like.liked = !like.liked;
            like.count = like.liked ? like.count + 1 : like.count - 1;
        }  else {
            like = likeRepository.create({user:{id:userId},
                blogPost:{id:postId},
                liked: true,
                count: 1 
            });
        }

        await likeRepository.save(like);
        res.status(200).json({ message: like.liked ? 'Blog post liked successfully' : 'Blog post unliked successfully' });
    } catch (error) {
        console.error('Error toggling like on blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
