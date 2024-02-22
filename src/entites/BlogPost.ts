import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
// import { Comment } from './Comment';
// import { Like } from './Like';

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publicationDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.blogPosts)
    author: User;

    // @OneToMany(() => Comment, comment => comment.blogPost)
    // comments: Comment[];

    // @ManyToMany(() => Like)
    // @JoinTable()
    // likes: Like[];
}