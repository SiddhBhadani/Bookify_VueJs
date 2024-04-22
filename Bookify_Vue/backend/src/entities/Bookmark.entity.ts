import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bookmark {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsNotEmpty()
  user: string;

  @Column()
  @IsNotEmpty()
  book: string;
}
