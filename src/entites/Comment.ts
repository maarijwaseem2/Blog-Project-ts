// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from './User';
// import { BlogPost } from './BlogPost';

// @Entity()
// export class Comment {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     content: string;

//     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date;

//     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//     updatedAt: Date;

//     @ManyToOne(() => User, user => user.id)
//     user: User;

// }
