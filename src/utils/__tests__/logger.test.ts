import logger from '../logger';

describe('Test helper functions', () => {
  test('should askQuestion work', () => {
    const consoleLog = jest.spyOn(global.console, 'log');
    logger.log('How are you?');
    expect(consoleLog).toBeCalledTimes(1);
    expect(consoleLog).toHaveBeenNthCalledWith(1, 'How are you?');
  });
});
