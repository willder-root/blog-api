import mongoose, {Schema} from 'mongoose';

class UsuarioError extends Error {}
const UsuarioSchema = new Schema({  
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

interface IUsuario {
    username?: string;
    password?: string;
    email?: string;
    createdAt?: Date;
}

const UsuarioModel = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

class Usuario  {
   

    static async createUser(params: IUsuario): Promise<IUsuario> {
        
        const usuario = new UsuarioModel(params);
        const existingUsers = await Usuario.find({ username: usuario.username })
        if (existingUsers.length > 0) {
            throw new UsuarioError('Username already exists');
        }
        try {
            const createdUser = await UsuarioModel.create({
                username: usuario.username,
                password: usuario.password,
                email: usuario.email,
                createdAt: usuario.createdAt,
            });
            return {
                username: createdUser.username,
                email: createdUser.email,
                password: createdUser.password,
                createdAt: createdUser.createdAt,
            } as IUsuario;
        } catch (error) {
            throw error
        }
    }

    static async find(params: IUsuario): Promise<IUsuario[]> {
        const whereParams: any = {};
        if (params.username) {
            whereParams.username = params.username;
        }
        if (params.email) {
            whereParams.email = params.email;
        }
        const users = await UsuarioModel.find(whereParams);

        return users.map(user => {
            return {
                username: user.username,
                password: user.password,
                email: user.email,
                createdAt: user.createdAt,
            } as IUsuario;
        })
    }

    static async delete (username: string, email: string): Promise<boolean> {
        try {

            if (!username && !email) {
                throw new UsuarioError('Username or email must be provided');
            }

            if (email) {
                const result = await UsuarioModel.deleteOne({ email });
                return result.deletedCount > 0;
            }else{
                const result = await UsuarioModel.deleteOne({ username });
                return result.deletedCount > 0;
            }
        } catch (error) {
            throw error;
        }
    }

    static async update (username: string, email: string, updates: Partial<IUsuario>): Promise<IUsuario | null> {
        try {
            const whereParams: any = {};
            if (username) whereParams.username = username;
            if (email) whereParams.email = email;
            
            if (!username && !email) {
                throw new UsuarioError('Username or email must be provided');
            }
            if (email) {
                updates.email = email;
            }
            const updatedUser = await UsuarioModel.findOneAndUpdate(
                { username, email },
                updates,
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}


export { Usuario, UsuarioError, IUsuario };