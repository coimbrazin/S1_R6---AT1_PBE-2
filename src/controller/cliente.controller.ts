import { Request, Response } from "express";
import { ClienteService } from "../service/cliente.service";

export class ClienteController {

  constructor(private service = new ClienteService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({
            message: "ID inválido"
          });
        }

        const cliente = await this.service.selecionarPorId(idConvertido);

        if (!cliente) {
          return res.status(404).json({
            message: "Cliente não encontrado"
          });
        }
        return res.status(200).json(cliente);
      }

      const clientes = await this.service.selecionarTodos();

      return res.status(200).json(clientes);

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { nome, email } = req.body;

      const id = await this.service.inserir(nome, email);

      return res.status(201).json({
        message: "Cliente criado com sucesso",
        id
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { nome, email } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      await this.service.atualizar(id, nome, email);

      return res.status(200).json({
        message: "Cliente atualizado com sucesso"
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  deletar = async (req: Request, res: Response) => {
    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      await this.service.deletar(id);

      return res.status(200).json({
        message: "Cliente deletado com sucesso"
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

}