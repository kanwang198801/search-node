import Search from './services/Search';
import logger from './utils/logger';
import { getData } from './utils/search';

const start = (): void => {
  const { usersData, ticketsData } = getData('src/data/users.json', 'src/data/tickets.json');
  const search: Search = new Search(usersData, ticketsData);
  search.start();
};

export default start;

try {
  start();
} catch (e) {
  logger.log('Program stopped because:\n', (e as Error).message);
  process.exit();
}
