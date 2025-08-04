import { Request, Response } from 'express';
import {Usuario, UsuarioError} from '../models/Usuario.model';

class UsuarioController {
    
  static async getUsuarios(req: Request, res: Response) {
    try {
      const { email, username } = req.query;
      const params: any = {};
      if (email) {
        params.email = email;
      }
        if (username) {
        params.username = username;
        }

      const usuarios = await Usuario.find(params);
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createUsuario(req: Request, res: Response) {
    const { username, password, email } = req.body;
    console.log(req.body);

    try {
      const newUser = await Usuario.createUser({username, password, email});
      res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof UsuarioError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
  }

    static async deleteUsuario(req: Request, res: Response) {
        const { username, email } = req.params;
        try {
            const deleted = await Usuario.delete(username, email);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            if (error instanceof UsuarioError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}


export default UsuarioController;