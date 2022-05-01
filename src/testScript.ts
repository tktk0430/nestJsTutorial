import { createConnection, getCustomRepository } from 'typeorm';
import { ItemRepository } from './items/item.repository';

(async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['src/entities/*.ts'],
  });
  const repo = getCustomRepository(ItemRepository);
  const items = await repo.find();
  console.log(items);
  await connection.close();
})();
