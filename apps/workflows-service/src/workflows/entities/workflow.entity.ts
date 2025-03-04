import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //NESSE CASO SO COLOCAMOS O ID DO BUILDING
  //PQ O OUTRO BANCO QUE VAI TER O RESTO DAS INFORMAÇÕES
  @Column()
  buildingId: number;
}
