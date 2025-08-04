import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller';
const usuarioRouter = Router();

usuarioRouter.get('/', UsuarioController.getUsuarios);
usuarioRouter.post('/', UsuarioController.createUsuario);
export default usuarioRouter;
