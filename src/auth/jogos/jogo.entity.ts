/* eslint-disable prettier/prettier */
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
} from 'typeorm';
  import { User } from 'src/users/user.entity'
@Entity()
export class Jogos {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    nome: string;
  
    @Column({ nullable: false, type: 'varchar'})
    imagem: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    bio: string;
  
    @CreateDateColumn()
    data_lancamento: Date;
  
    @ManyToOne(
      () => User,
       user => user.jogos,
       { eager: true },
    )
    user: any;
    
}