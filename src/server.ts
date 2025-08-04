import app from './app';
import 'dotenv/config';
const PORT = process.env.PORT || 3000;


app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
});
