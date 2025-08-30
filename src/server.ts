import app from './app';
import { configEnv,ServerConfig } from './config/env'; 

const { PORT } = configEnv.get<ServerConfig>('SERVER');

app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
});
