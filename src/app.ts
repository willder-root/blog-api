import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import router from './routes';
import MongoConnection from './config/database';
import { configEnv,MongoConfig, SessionConfig } from './config/env';

const { SECRET } = configEnv.get<SessionConfig>('SESSION')
const { URI } = configEnv.get<MongoConfig>('MONGO');
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

MongoConnection.getInstance().then(() => {
  app.emit('ready');
});

app.use(session({
  secret: SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    collectionName: 'sessions',
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 1 dia,
    httpOnly: true,
  },
}));

app.use(flash());

app.use(router);



export default app;