export interface UserReadModel {
  userId: string,
  userName: string,
  color: string
}

export interface User {
  userId: string,
  userName: string,
  color: string,
}

export function toUser(model: UserReadModel): User {
  return {
    userId: model.userId,
    userName: model.userName,
    color: model.color
  }
}

export function toUsers(models: UserReadModel[]): User[] {
  return models.map(model => toUser(model));
}