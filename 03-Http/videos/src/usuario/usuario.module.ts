// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        UsuarioModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'ocanabryan',
            password: 'root',
            database: 'ocanabryan_bdd',
            synchronize: true,
            entities: [

            ]
        }),
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService
    ],
    exports:[
        UsuarioService
    ]
})
export class UsuarioModule {
}