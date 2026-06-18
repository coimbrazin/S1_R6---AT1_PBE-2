import { Request, Response } from "express";
import { ProdutoService } from "../service/produto.service";

export class ProdutoController {

  constructor(private service = new ProdutoService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }
        const produto = await this.service.selecionarPorId(idConvertido);

        if (!produto) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }
        return res.status(200).json(produto);
      }
      const produtos = await this.service.selecionarTodos();

      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { nome, preco, id_categoria } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Imagem do produto obrigatória" })
      }

      const vinculo_imagem = req.file.filename;
      const id = await this.service.inserir(nome, preco, id_categoria, vinculo_imagem);

      return res.status(201).json({ message: "Produto criado com sucesso", id });

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
      const { nome, preco, id_categoria } = req.body;

      const resultado = await this.service.atualizar(id, nome, preco, id_categoria);

      return res.status(200).json({
        message: "Produto atualizado com sucesso",
        dados: resultado
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

      const resultado = await this.service.deletar(id);

      return res.status(200).json({
        message: "Produto deletado com sucesso",
        dados: resultado
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

}