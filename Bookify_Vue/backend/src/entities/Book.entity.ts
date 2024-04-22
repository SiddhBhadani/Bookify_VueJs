import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn, ObjectId } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

@Entity()
export class Book {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  author: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  edition: number;

  @Column()
  @IsOptional()
  @IsString()
  places: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @Column()
  @IsOptional()
  @IsString()
  discription: string;

  @Column()
  @IsOptional()
  @IsString()
  img: string;
}
