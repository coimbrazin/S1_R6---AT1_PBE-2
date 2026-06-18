import { ResultSetHeader } from "mysql2";
import { connection } from "../database/connection.database";
import { iPedido } from "../models/pedido.model";

export class PedidoRepository {

    async selectAll(): Promise<iPedido[]> {
        const sql = "SELECT * FROM pedidos";
        const [rows] = await connection.execute<iPedido[]>(sql);
        return rows;
    }

    async selectById(id: number): Promise<iPedido | null> {
        const sql = "SELECT * FROM pedidos WHERE id_pedido=?";
        const values = [id];
        const [rows] = await connection.execute<iPedido[]>(sql, values);
        return rows[0];
    }

    async insert(id_cliente: number, id_vendedor: number): Promise<number> {
        const sql = `INSERT INTO pedidos (id_cliente, id_vendedor) VALUES (?, ?)`;
        const values = [id_cliente, id_vendedor];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }

    async update(id: number, id_cliente: number, id_vendedor: number, valor_final: number): Promise<ResultSetHeader> {
        const sql = `UPDATE pedidos SET id_cliente=?, id_vendedor=?, valor_final=? WHERE id_pedido=?`;
        const values = [id_cliente, id_vendedor, valor_final, id];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM pedidos WHERE id_pedido=?";
        const values = [id];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async calcularValorPedido(id_pedido: number): Promise<number> {
        const sql = `SELECT SUM(quantidade * preco_unitario) AS total FROM itenspedidos WHERE id_pedido=?`;
        const values = [id_pedido];
        const [rows] = await connection.execute<any[]>(sql, values);
        return rows[0].total ?? 0;
    }

    async atualizarValorFinal(id_pedido: number, valor: number) {
    const sql = `UPDATE pedidos SET valor_final=? WHERE id_pedido=?`;
    const values = [valor, id_pedido];
    await connection.execute(sql, values);
}

}