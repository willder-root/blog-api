import 'dotenv/config';

export type ServerConfig = {
    PORT:number;
}

export type MongoConfig = {
    URI: string;
}

export type SessionConfig = {
    SECRET: string;
}


type Enviroment = {
    MONGO: MongoConfig;
    SESSION: SessionConfig;
    SERVER: ServerConfig;
}

export type Key = keyof Enviroment;

class Config {
    constructor(){
        this.env = this.loadEnv();
    }

    private env: Enviroment;

    public get<T = any>(key: Key):T {
        return this.env[key] as T;
    }

    private loadEnv():Enviroment{
        return {
            SERVER:{
                PORT: Number.parseInt(String(process.env.PORT)) || 8080
            },
            MONGO:{
                URI: String(process.env.MONGO_URI),
            },
            SESSION:{
                SECRET: String(process.env.SESSION_SECRET),
            },
        }
    }
    
}

export const configEnv = new Config();