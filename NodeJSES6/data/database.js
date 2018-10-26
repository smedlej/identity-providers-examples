import path from 'path';
import csvdb from 'node-csv-query';

const database = { connection: null };

<<<<<<< HEAD
csvdb(path.join(__dirname, './database.csv'), { rtrim: true }).then((db) => {
||||||| parent of 14105d7... Modify DB path
csvdb(path.join(__dirname, '../data/database.csv'), { rtrim: true }).then((db) => {
=======
csvdb(path.join(__dirname, '../../../fcp_mocks_dataset/fcp_mock_dataset.csv'), { rtrim: true }).then((db) => {
>>>>>>> 14105d7... Modify DB path
  // eslint-disable-next-line no-console
  console.log('Connected to database!');

  database.connection = db;
});

export default database;
