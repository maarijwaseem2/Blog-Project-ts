import {Entity, PrimaryGeneratedColumn,Column,OneToMany,Unique} from 'typeorm';
import {BlogPost} from './BlogPost';
@Entity()
@Unique(['email'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(() => BlogPost, blogPost => blogPost.author,{cascade:true, eager:true})
    blogPosts: BlogPost[];
}