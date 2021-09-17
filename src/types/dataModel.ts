/* eslint-disable camelcase */
export interface userType {
  _id: number;
  name: string;
  created_at: string;
  verified: boolean;
  tickets?: string[];
}

export interface ticketType {
  _id: string;
  created_at: string;
  type: string;
  subject: string;
  assignee_id?: number;
  tags: string[];
  assignee_name?: string;
}

export interface getDataType {
  usersData: userType[];
  ticketsData: ticketType[];
}
