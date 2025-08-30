import mongoose from 'mongoose';
import { configEnv, MongoConfig } from './env';

class MongoConnection {
    private static instance: mongoose.Mongoose;
    private constructor() {}

    private static async initialize(): Promise<void> {
        if (!MongoConnection.instance) {
            const connectString = configEnv.get<MongoConfig>('MONGO').URI;
            this.instance = await mongoose.connect(connectString);
            console.log("Conexão ao MongoDB inicializada");
        }
    }

    public static async getInstance(): Promise<mongoose.Mongoose> {
        await MongoConnection.initialize();
        return MongoConnection.instance;
    }
    
}
export default MongoConnection;
