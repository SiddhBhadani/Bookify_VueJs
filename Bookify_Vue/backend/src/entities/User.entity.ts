import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectIdColumn, ObjectId } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@Entity()
export class User {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  img: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column()
  bookmarks: string[];

}
