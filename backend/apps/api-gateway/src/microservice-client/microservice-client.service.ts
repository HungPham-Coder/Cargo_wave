import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MicroserviceClientService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    async onModuleInit() {
        //auth
        this.client.subscribeToResponseOf('hero.auth.register');
        this.client.subscribeToResponseOf('hero.auth.login');

        //user
        this.client.subscribeToResponseOf('hero.user.findAll');
        this.client.subscribeToResponseOf('hero.user.findById');
        this.client.subscribeToResponseOf('hero.user.findByEmail');
        this.client.subscribeToResponseOf('hero.user.createUser');
        this.client.subscribeToResponseOf('hero.user.removeUser');

        //permission
        this.client.subscribeToResponseOf('hero.permission.findAll');
        this.client.subscribeToResponseOf('hero.permission.findAllWithPaging');

        //roles
        this.client.subscribeToResponseOf('hero.role.findAllWithPaging');
        this.client.subscribeToResponseOf('hero.role.findOneByName');
        this.client.subscribeToResponseOf('hero.role.create');
        this.client.subscribeToResponseOf('hero.role.updateRoleStatus');
        this.client.subscribeToResponseOf('hero.role.updateRoleNameByID');
        this.client.subscribeToResponseOf('hero.role.assignPermissions');

        await this.client.connect();
    }
}
