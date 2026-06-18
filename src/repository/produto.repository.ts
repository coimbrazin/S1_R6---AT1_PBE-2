import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iProduto } from "../models/produto.model";

export class ProdutoRepository {

    async selectAll(): Promise<iProduto[]> {
        const sql = "SELECT * FROM produtos";
        const [rows] = await db.execute<iProduto[]>(sql);
        return rows;
    }

    async selectById(id: number): Promise<iProduto | null> {
        const sql = "SELECT * FROM produtos WHERE id_produto=?";
        const values = [id];
        const [rows] = await db.execute<iProduto[]>(sql, values);
        return rows[0];
    }

    async insert(nome: string, preco: number, id_categoria: number, vinculo_imagem: string): Promise<number> {
        const sql = `INSERT INTO produtos (nome, preco, id_categoria, vinculo_imagem) VALUES (?, ?, ?, ?)`;
        const values = [nome, preco, id_categoria, vinculo_imagem];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }

    async update(id: number, nome: string, preco: number, id_categoria: number): Promise<ResultSetHeader> {
        const sql = `UPDATE produtos SET nome=?, preco=?, id_categoria=? WHERE id_produto=?`;
        const values = [nome, preco, id_categoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM produtos WHERE id_produto=?";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}