import bcrypt from 'bcrypt';
export const encodePassword = async(password) : Promise<any> =>{await bcrypt.hash(password, 10)} 

export const comparePasswords = {}