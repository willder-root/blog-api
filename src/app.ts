import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import router from './routes';
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


const connectString = `${process.env.MONGO_URI}`

mongoose.connect(connectString).then(()=>{
  console.log("Conexão ao mongoDB inicializada");   
  app.emit('ready'); 
}).catch((err) => {
  console.error("Erro ao conectar ao mongoDB:", err);
});


app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: connectString,
    collectionName: 'sessions',
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 1 dia,
    httpOnly: true,
  },
}));

app.use(flash());

app.use(router)


export default app;