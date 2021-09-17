export enum searchTypeEnum {
  Users = 'users',
  Tickets = 'tickets',
}

export enum searchOptionsEnum {
  Option1 = '1',
  Option2 = '2',
  Quit = 'quit',
}

export enum userSearchTermEnum {
  Id = '_id',
  Name = 'name',
  CreatedAt = 'created_at',
  Verified = 'verified',
  Tickets = 'tickets',
}

export enum ticketSearchTermEnum {
  Id = '_id',
  CreatedAt = 'created_at',
  Type = 'type',
  Subject = 'subject',
  AssigneeId = 'assignee_id',
  Tags = 'tags',
  AssigneeName = 'assignee_name',
}
