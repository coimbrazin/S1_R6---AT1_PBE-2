import express from 'express';
import path from 'node:path';
import { EnvVar } from './config/EnvVar';
import router from './routes/routes';
import { initializeDatabase } from './database/connection.database';

const app = express();

app.use(express.json());
app.use(express.static(path.resolve('uploads')));
app.use('/', router);

initializeDatabase()
    .then(() => {
        app.listen(EnvVar.SERVER_PORT, () => {
            console.log(`Servidor rodando na porta ${EnvVar.SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao inicializar o banco de dados:', err);
    });