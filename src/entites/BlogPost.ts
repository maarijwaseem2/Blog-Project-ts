import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { BlogLike } from './BlogLike'; // Import the BlogPostLike entity

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.blogPosts)
    author: User;

    @OneToMany(() => Comment, comment => comment.id)
    comments: Comment[];

    @OneToMany(() => BlogLike, like => like.blogPost)
    likes: BlogLike[]; 
}
