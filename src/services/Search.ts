import MESSAGES from '../constants/message';
import logger from '../utils/logger';
import { userType, ticketType } from '../types/dataModel';
import { searchTypeEnum, searchOptionsEnum, userSearchTermEnum, ticketSearchTermEnum } from '../types/enums';
import {
  askQuestion,
  searchUser,
  searchTicket,
  getSearchableFields,
  printSearchResult,
  searchUserByValues,
  searchTicketByValues,
} from '../utils/search';

class Search {
  private _searchType: searchTypeEnum | unknown;

  private _term: string;

  private _value: string;

  private readonly _usersData: userType[];

  private readonly _ticketsData: ticketType[];

  constructor(usersData: userType[], ticketsData: ticketType[]) {
    this._searchType = null;
    this._term = '';
    this._value = '';
    this._usersData = usersData;
    this._ticketsData = ticketsData;
  }

  start(): void {
    if (this._usersData?.length > 0 && this._ticketsData?.length > 0) {
      this.chooseOption();
    } else {
      logger.log(MESSAGES.DataIsMissing);
    }
  }

  private async chooseOption(): Promise<void> {
    while (true) {
      const option = (await askQuestion(MESSAGES.Welcome)).trim();
      if (option === searchOptionsEnum.Option1) {
        this.searchZendesk();
      } else if (option === searchOptionsEnum.Option2) {
        getSearchableFields();
      } else if (option === searchOptionsEnum.Quit) {
        process.exit();
      } else {
        logger.log(MESSAGES.SelectCorrectOption);
      }
    }
  }

  private async searchZendesk(): Promise<void> {
    while (true) {
      const option = (await askQuestion(MESSAGES.SelectSearchType)).trim();
      if (option === searchOptionsEnum.Option1) {
        this._searchType = searchTypeEnum.Users;
        this.searchTerm();
      } else if (option === searchOptionsEnum.Option2) {
        this._searchType = searchTypeEnum.Tickets;
        this.searchTerm();
      } else {
        logger.log(MESSAGES.SelectCorrectOption);
      }
    }
  }

  private async searchTerm(): Promise<void> {
    while (true) {
      this._term = (await askQuestion(MESSAGES.EnterSearchTerm)).trim().toLowerCase() as string;
      if (
        (this._searchType === searchTypeEnum.Users &&
          Object.values(userSearchTermEnum).includes(this._term as userSearchTermEnum)) ||
        (this._searchType === searchTypeEnum.Tickets &&
          Object.values(ticketSearchTermEnum).includes(this._term as ticketSearchTermEnum))
      ) {
        this.searchValue();
      } else {
        logger.log(MESSAGES.SelectCorrectSearchTerm);
      }
    }
  }

  private async searchValue(): Promise<void> {
    let searchResult: userType[] | ticketType[] = [];
    this._value = (await askQuestion(MESSAGES.EnterSearchValue)).trim() as string;

    logger.log(`Searching for ${this._searchType} ${this._term} with a value of ${this._value}`);

    if (this._searchType === searchTypeEnum.Users) {
      // searchResult = searchUser(this._usersData, this._ticketsData, this._term as userSearchTermEnum, this._value);
      searchResult = searchUserByValues(
        this._usersData,
        this._ticketsData,
        this._term as userSearchTermEnum,
        this._value ? this._value.split(',') : []
      );
    } else if (this._searchType === searchTypeEnum.Tickets) {
      // searchResult = searchTicket(this._usersData, this._ticketsData, this._term as ticketSearchTermEnum, this._value);
      searchResult = searchTicketByValues(
        this._usersData,
        this._ticketsData,
        this._term as ticketSearchTermEnum,
        this._value ? this._value.split(',') : []
      );
    }
    if (!searchResult.length) {
      logger.log(MESSAGES.NoResult);
    } else {
      printSearchResult(searchResult);
    }
    this.chooseOption();
  }
}

export default Search;
