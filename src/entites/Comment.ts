import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { BlogPost } from './BlogPost';
import { CommentLike } from './CommentLike'; 

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.comments, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => BlogPost, post => post.comments, { nullable: false })
    @JoinColumn({ name: 'postId' })
    post: BlogPost;

    @OneToMany(() => CommentLike, like => like.comment)
    likes: CommentLike[];

    public isOwnedBy(userId: number, postId: number): boolean {
        return this.user.id === userId && this.post.id === postId;
    }
}
