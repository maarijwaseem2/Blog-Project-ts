// import { Request, Response } from 'express';
// import { AppDataSource } from '../database/db.config';
// import { CommentLike } from '../entites/CommentLike';

// export const toggleLikeComment = async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.id);
//     const commentId = parseInt(req.params.id);
//     const likeRepository = AppDataSource.getRepository(CommentLike);

//     try {
//         let like = await likeRepository.findOne({ where: { userId, commentId } });

//         if (like) {
//             if (like.liked) {
//                 like.count--;
//             } else {
//                 like.count++;
//             }
//             like.liked = !like.liked;
//         } else {
//             like = likeRepository.create({ userId, commentId, liked: true, count: 1 });
//         }

//         await likeRepository.save(like);
//         res.status(200).json({ message: like.liked ? 'Comment liked successfully' : 'Comment unliked successfully' });
//     } catch (error) {
//         console.error('Error toggling like on comment:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
