import readline from 'readline';
import fs from 'fs';
import logger from './logger';
import { userType, ticketType, getDataType } from '../types/dataModel';
import { userSearchTermEnum, ticketSearchTermEnum, searchTypeEnum } from '../types/enums';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askQuestion = (question: string): Promise<string> =>
  new Promise(resolve => rl.question(question, resolve));

export const getData = (usersDataPath: string, ticketsDataPath: string): getDataType => {
  const usersData = JSON.parse(fs.readFileSync(usersDataPath, 'utf8'));
  const ticketsData = JSON.parse(fs.readFileSync(ticketsDataPath, 'utf8'));
  return {
    usersData,
    ticketsData,
  };
};

export const searchUser = (
  usersData: userType[],
  ticketsData: ticketType[],
  term: userSearchTermEnum,
  value: string
): userType[] => {
  const searchValue = String(value).toLowerCase();
  const foundUsers = usersData.filter((user: userType) => {
    const userKeyValue = String(user[term]).toLowerCase();
    const isSearchMissingValue = !searchValue && userKeyValue === 'undefined';
    return isSearchMissingValue || userKeyValue === searchValue;
  });

  return foundUsers.map(user => {
    const tickets = ticketsData.filter((ticket: ticketType) => ticket?.assignee_id === user?._id);
    return { ...user, tickets: tickets.map(ticket => ticket?.subject) };
  });
};

export const searchTicket = (
  usersData: userType[],
  ticketsData: ticketType[],
  term: ticketSearchTermEnum,
  value: string
): ticketType[] => {
  const searchValue = String(value).toLowerCase();
  const foundTickets = ticketsData.filter((ticket: ticketType) => {
    const ticketKeyValue = String(ticket[term]).toLowerCase();
    const isSearchMissingValue = !searchValue && ticketKeyValue === 'undefined';
    if (term.toLowerCase() === ticketSearchTermEnum.Tags) {
      return isSearchMissingValue || ticket?.tags?.map(tag => tag.toLowerCase()).includes(searchValue);
    }
    return isSearchMissingValue || ticketKeyValue === searchValue;
  });

  return foundTickets.map(ticket => {
    const foundUser = usersData.find((user: userType) => ticket?.assignee_id === user?._id);
    return { ...ticket, assignee_name: foundUser?.name };
  });
};

export const getSearchableFields = (): void => {
  Object.values(searchTypeEnum).forEach(value => {
    logger.log(`----------------------\nSearch ${value} with`);
    if (value === searchTypeEnum.Users) {
      logger.log(Object.values(userSearchTermEnum).join('\n'));
    } else if (value === searchTypeEnum.Tickets) {
      logger.log(Object.values(ticketSearchTermEnum).join('\n'));
    }
  });
  logger.log(`----------------------\n`);
};

export const printSearchResult = (searchResult: any): void => {
  searchResult.forEach((item: any) => {
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === 'object') {
        item[key] = JSON.stringify(value);
      }
    });
    logger.table(item);
  });
};
