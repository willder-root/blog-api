import { Router } from 'express';
import usuarioRouter from './usuario.route';

const router = Router();

router.use('/usuario', usuarioRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Blog API!' });
});


export default router;