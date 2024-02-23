import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { BlogPost } from './BlogPost';

@Entity()
export class BlogLike {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ default: false })
    liked: boolean;

    @Column({ default: 0 })
    count: number;
    
    @ManyToOne(() => User, {nullable: false}) 
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => BlogPost, {nullable: false})
    @JoinColumn({ name: 'postId' })
    blogPost: BlogPost;

}
