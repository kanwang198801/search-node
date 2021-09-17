import ticketsData from '../../testData/tickets.json';
import usersData from '../../testData/users.json';
import { askQuestion, getData, searchUser, searchTicket, getSearchableFields, printSearchResult } from '../search';
import { userSearchTermEnum, ticketSearchTermEnum } from '../../types/enums';

describe('Test helper functions', () => {
  test('should askQuestion work', () => {
    askQuestion('How are you?').then(value => {
      expect(value).toBeTruthy();
    });
  });
  it('Should getData work', () => {
    const returnResult = {
      usersData,
      ticketsData,
    };
    expect(getData('src/testData/users.json', 'src/testData/tickets.json')).toEqual(returnResult);
  });
  it('Should searchUsers find a existing user', () => {
    const returnResult = [
      {
        ...usersData[0],
        tickets: ['A Catastrophe in Micronesia'],
      },
    ];
    expect(searchUser(usersData, ticketsData, userSearchTermEnum.Id, '1')).toEqual(returnResult);
  });
  it('Should searchUsers can not find a not existing user', () => {
    expect(searchUser(usersData, ticketsData, userSearchTermEnum.Id, '4')).toEqual([]);
  });
  it('Should searchTicket find a existing ticket', () => {
    const returnResult = [
      {
        ...ticketsData[1],
        assignee_name: 'Francisca Rasmussen',
      },
    ];
    expect(
      searchTicket(usersData, ticketsData, ticketSearchTermEnum.Id, '1a227508-9f39-427c-8f57-1b72f3fab87c')
    ).toEqual(returnResult);
  });
  it('Should searchTicket can not find a not existing ticket', () => {
    expect(searchTicket(usersData, ticketsData, ticketSearchTermEnum.Id, '12345')).toEqual([]);
  });
  it('Should searchTicket by tags work', () => {
    const returnResult = [
      {
        ...ticketsData[1],
        assignee_name: 'Francisca Rasmussen',
      },
    ];
    expect(searchTicket(usersData, ticketsData, ticketSearchTermEnum.Tags, 'Puerto Rico')).toEqual(returnResult);
  });
  it('Should getSearchableFields work', async () => {
    const consoleLog = jest.spyOn(global.console, 'log');
    getSearchableFields();
    expect(consoleLog).toBeCalledTimes(5);
    expect(consoleLog).toHaveBeenNthCalledWith(1, '----------------------\nSearch users with');
    expect(consoleLog).toHaveBeenNthCalledWith(2, '_id\nname\ncreated_at\nverified\ntickets');
    expect(consoleLog).toHaveBeenNthCalledWith(3, '----------------------\nSearch tickets with');
    expect(consoleLog).toHaveBeenNthCalledWith(4, '_id\ncreated_at\ntype\nsubject\nassignee_id\ntags\nassignee_name');
    expect(consoleLog).toHaveBeenLastCalledWith('----------------------\n');
  });
  it('Should printSearchResult work', () => {
    const returnResult = [
      {
        ...ticketsData[1],
        assignee_name: 'Francisca Rasmussen',
      },
    ];
    const returnPrintResult = {
      ...ticketsData[1],
      assignee_name: 'Francisca Rasmussen',
      tags: '["Puerto Rico","Idaho","Oklahoma","Louisiana"]',
    };
    const consoleTable = jest.spyOn(global.console, 'table');
    printSearchResult(returnResult);
    expect(consoleTable).toBeCalledTimes(1);
    expect(consoleTable).toHaveBeenCalledWith(returnPrintResult);
  });
});
