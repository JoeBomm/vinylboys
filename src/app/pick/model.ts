export interface User {
  UserId: number,
  UserName: string,
  Color: string
}

export interface PickReadModel {
  UserId: number,
  UserName: string,
  HexColor: string,
  PickId: number,
  AlbumName: string,
  Artist: string,
  Year: number,
  SpotifyUrl: string,
  Note: string,
  ThemeName: string
}

export interface PickDto {
  PickId?: number,
  AlbumName?: string,
  Artist?: string,
  Year?: number,
  SpotifyUrl?: string,
  Note?: string,
  User: User,
  ThemeName: string
}

export function toPickDto(model: PickReadModel): PickDto {
  return {
    PickId: model.PickId,
    AlbumName: model.AlbumName,
    Artist: model.Artist,
    Year: model.Year,
    SpotifyUrl: model.SpotifyUrl,
    Note: model.Note,
    User: {
      UserId: model.UserId,
      UserName: model.UserName,
      Color: model.HexColor
    },
    ThemeName: model.ThemeName
  }
}

export function toPickDtos(models: PickReadModel[]): PickDto[] {
  return models.map(model => toPickDto(model));
}