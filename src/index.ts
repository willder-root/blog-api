import 'dotenv/config';

import mongoose from 'mongoose';

const connectString = `${process.env.MONGO_URI}`
mongoose.connect(connectString).then(()=>{
    console.log("Conexão ao mongoDB inicializada");    
});