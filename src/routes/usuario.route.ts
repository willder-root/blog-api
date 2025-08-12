import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller';
const usuarioRouter = Router();

usuarioRouter.get('/', UsuarioController.getUsuarios);
usuarioRouter.post('/', UsuarioController.createUsuario);
usuarioRouter.delete('/', UsuarioController.deleteUsuario);

export default usuarioRouter;
