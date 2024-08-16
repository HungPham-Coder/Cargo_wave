export class CreateUserRequest{
    id: number;
    name:string;
    phone: number;
    email: string;
    password: string;
    position: number;
    born: string;

    //tai sao setPass khong la function
    // setPass (pass: string): void{
    //     this.password = pass;    
    // }
}