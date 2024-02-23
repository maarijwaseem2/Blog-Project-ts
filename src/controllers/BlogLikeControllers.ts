// import { Request, Response } from 'express';
// import { AppDataSource } from '../database/db.config';
// import { BlogLike } from '../entites/BlogLike';

// export const toggleLikeBlogPost = async (req: Request, res: Response) => {
//     const { userId, postId } = req.params;
//     // const userId:number = parseInt(req.params.id);
//     // const postId:number = parseInt(req.params.id);
//     const likeRepository = AppDataSource.getRepository(BlogLike);

//     try {
//         // let like = await likeRepository.findOne({ where: { userId,postId } });
//         let like = await likeRepository.findOne({ where: { user: parseInt(userId), post: parseInt(postId) } });

//         if (like) {
//             if (like.liked) {
//                 like.count--;
//             } else {
//                 like.count++;
//             }
//             like.liked = !like.liked;
//         } else {
//             like = likeRepository.create({ userId, postId, liked: true, count: 1 });
//         }

//         await likeRepository.save(like);
//         res.status(200).json({ message: like.liked ? 'Blog post liked successfully' : 'Blog post unliked successfully' });
//     } catch (error) {
//         console.error('Error toggling like on blog post:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
