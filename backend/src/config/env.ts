import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_HOST: str({
    default: 'localhost',
    desc: 'Endereço do host onde o banco de dados PostgreSQL está rodando',
  }),
  DATABASE_PORT: port({
    default: 5432,
    desc: 'Porta de conexão com o banco de dados PostgreSQL',
  }),
  DATABASE_USER: str({
    default: 'postgres',
    desc: 'Nome de usuário do banco de dados PostgreSQL',
  }),
  DATABASE_PASSWORD: str({
    default: 'postgres',
    desc: 'Senha do usuário do banco de dados PostgreSQL',
  }),
  DATABASE_NAME: str({
    default: 'zoppy',
    desc: 'Nome do banco de dados PostgreSQL a ser utilizado',
  }),
  APP_PORT: port({
    default: 3000,
    desc: 'Porta onde a aplicação Node.js será exposta',
  }),
  REDIS_URL: str({
    default: 'redis://localhost:6379',
  }),
});
