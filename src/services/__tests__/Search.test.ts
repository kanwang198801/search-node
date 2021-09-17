import Search from '../Search';
import { getData } from '../../utils/search';
import MESSAGES from '../../constants/message';

const { usersData, ticketsData } = getData('src/testData/users.json', 'src/testData/tickets.json');

describe('Test Search class', () => {
  it('Should search start work with no data', () => {
    const consoleLog = jest.spyOn(global.console, 'log');
    const searchNoData = new Search([], []);
    searchNoData.start();

    expect(consoleLog).toBeCalledTimes(1);
    expect(consoleLog).toHaveBeenCalledWith(MESSAGES.DataIsMissing);
  });
  it('Should search start work with data', async () => {
    const chooseOption = jest.spyOn(Search.prototype as any, 'chooseOption');
    chooseOption.mockImplementation(async () => { });
    const search = new Search(usersData, ticketsData);
    search.start();

    expect(chooseOption).toHaveBeenCalled();
  });
});
