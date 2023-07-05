import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  public createdAt: string;

  @Column()
  public createdBy: string;
}
