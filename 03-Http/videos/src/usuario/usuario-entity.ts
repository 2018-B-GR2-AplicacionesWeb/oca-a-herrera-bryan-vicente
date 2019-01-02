

@Entity('db_usuario')
export  class UsuarioEntity {

    @PrimaryGenerateColumn()
    id: number;

    @Column()
    nombre:string;

    @Column()
    biografia:string;
}