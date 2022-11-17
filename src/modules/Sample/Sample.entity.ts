import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  id: string;
}
