import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    static #instance: Database | null = null;
    #pool: mysql.Pool | null = null;

    #createPool(): void {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    static getInstance(): Database {
        if (!Database.#instance) {
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }
        return Database.#instance;
    }

    getPool(): mysql.Pool {
        return this.#pool!;
    }
}

export const connection = Database.getInstance().getPool();

export async function initializeDatabase(): Promise<void> {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            ssl: { rejectUnauthorized: false }
        });

        const dbName = process.env.DB_DATABASE || 'deploy_ofc';

        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id_categoria INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id_produto INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                id_categoria INT NOT NULL,
                vinculo_imagem VARCHAR(255) NOT NULL,
                CONSTRAINT fk_produto_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id_cliente INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS vendedores (
                id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id_pedido INT AUTO_INCREMENT PRIMARY KEY,
                data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                id_cliente INT NOT NULL,
                id_vendedor INT NOT NULL,
                valor_final DECIMAL(10, 2) NOT NULL DEFAULT 0,
                CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente),
                CONSTRAINT fk_pedido_vendedor FOREIGN KEY (id_vendedor) REFERENCES vendedores (id_vendedor)
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS itenspedidos (
                id_item INT AUTO_INCREMENT PRIMARY KEY,
                id_pedido INT NOT NULL,
                id_produto INT NOT NULL,
                quantidade INT NOT NULL,
                preco_unitario DECIMAL(10, 2) NOT NULL,
                CONSTRAINT fk_item_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
                CONSTRAINT fk_item_produto FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
            );
        `);

        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}