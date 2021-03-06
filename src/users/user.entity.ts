/* eslint-disable prettier/prettier */
import { 
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Jogos } from 'src/auth/jogos/jogo.entity';
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;
    
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar'})
    imagem: string;

    @Column({ nullable: false})
    nascimento: Date;

    @Column({ nullable: false, type: 'varchar'})
    bio: string;

    //admin ou usuario comumm?
    @Column({ nullable: false, type: 'varchar', length: 20 })
    role: string;

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @OneToMany(() => Jogos, jogos => jogos.user)
    // jogos: Jogos;

    @OneToOne(
        _=> Jogos,
        jogos => jogos.user,
        { cascade: true },
      )
      jogos: Jogos;
    
    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    }
}