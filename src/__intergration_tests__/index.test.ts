import start from '../index';
import Search from '../services/Search';

describe('Test index', () => {
  it('Should start search program', () => {
    const startSearch = jest.spyOn(Search.prototype as any, 'start');
    startSearch.mockImplementation(async () => { });
    start();
    expect(startSearch).toHaveBeenCalled();
  });
});
