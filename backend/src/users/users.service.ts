import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id" : 1,
            "name":"Phuong Dong",
            "email":"nnpdong.magic1306@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id" : 2,
            "name":"Phuong Nam",
            "email":"nnpdong.magic1306@gmail.com",
            "role": "INTERN"
        },
        {
            "id" : 3,
            "name":"Phuong Tay",
            "email":"nnpdong.magic1306@gmail.com",
            "role": "ADMIN"
        },
        {
            "id" : 4,
            "name":"Phuong Bac",
            "email":"nnpdong.magic1306@gmail.com",
            "role": "INTERN"
        },

    ]

    findAll(role?: 'INTERN' | 'ADMIN' |'ENGINEERS'){
        if(role){
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user =>user.id === id)
        return user
    }

    create (user: { name: string, email: string, role: 'INTERN' | 'ENGINEER'| 'ADMIN'})
    {
        const usersByHighestId = [...this.users].sort ((a, b) => b.id - a.id) // sắp xếp giảm dần
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update (id: number, updateUser: { name: string, email: string, role: 'INTERN' | 'ENGINEER'| 'ADMIN'})
    {
        this.users = this.users.map (user => {
            if (user.id === id ){
                return {...user, ...updateUser}
            }
            return user
        })
        return this.findOne(id)
    }

    delete (id:number ){
        const removedUser = this.users.filter (user => user.id !==id)
        this.users = this.users.filter (user => user.id !== id)
        return removedUser;
    }
}
