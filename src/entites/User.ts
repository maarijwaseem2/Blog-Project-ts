import {Entity, PrimaryGeneratedColumn,Column,OneToMany,Unique} from 'typeorm';
import {BlogPost} from './BlogPost';
import {Comment} from './Comment';
@Entity()
@Unique(['email'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(() => BlogPost, blogPost => blogPost.author,{cascade:true, eager:true, onDelete:"CASCADE"})
    blogPosts: BlogPost[];

    @OneToMany(() => Comment, comment => comment.user,{cascade:true, eager:true, onDelete:"CASCADE"})
    comments: Comment[];
}