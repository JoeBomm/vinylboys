import { User } from "@/types/user";

export interface PickReadModel {
  UserId: string,
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
  pickId?: number,
  albumName?: string,
  artist?: string,
  year?: number,
  spotifyUrl?: string,
  note?: string,
  user: User,
  themeName: string
}

export function toPickDto(model: PickReadModel): PickDto {
  return {
    pickId: model.PickId,
    albumName: model.AlbumName,
    artist: model.Artist,
    year: model.Year,
    spotifyUrl: model.SpotifyUrl,
    note: model.Note,
    user: {
      userId: model.UserId,
      userName: model.UserName,
      color: model.HexColor,
    },
    themeName: model.ThemeName,
  }
}

export function toPickDtos(models: PickReadModel[]): PickDto[] {
  return models.map(model => toPickDto(model));
}