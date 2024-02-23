// Like for Comment entity

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class CommentLike {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ default: false })
    liked: boolean;

    @Column({ default: 0 })
    count: number;
    
    @ManyToOne(() => User, {nullable: false})
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Comment, {nullable: false})
    @JoinColumn({ name: 'commentId' })
    comment: Comment;

}
