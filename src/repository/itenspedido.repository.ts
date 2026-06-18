import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../database/connection.database";
import { iItemPedido } from "../models/itenspedido.model";

export class ItensPedidoRepository {

    async selectByPedido(id_pedido: number): Promise<iItemPedido[]> {
        const sql = `SELECT * FROM itenspedidos WHERE id_pedido=?`;
        const [rows] = await db.execute<iItemPedido[]>(sql, [id_pedido]);
        return rows;
    }

    async selectById(id: number): Promise<iItemPedido | null> {
        const sql = `SELECT * FROM itenspedidos WHERE id_item=?`;
        const [rows] = await db.execute<iItemPedido[]>(sql, [id]);
        return rows[0];
    }

    async insert(id_pedido: number, id_produto: number, quantidade: number, preco_unitario: number): Promise<number> {
        const sql = `INSERT INTO itenspedidos (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`;
        const values = [id_pedido, id_produto, quantidade, preco_unitario];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    async update(id: number, quantidade: number, preco_unitario: number): Promise<ResultSetHeader> {
        const sql = `UPDATE itenspedidos SET quantidade=?, preco_unitario=? WHERE id_item=?`;
        const values = [quantidade, preco_unitario, id];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM itenspedidos WHERE id_item=?`;
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }
}