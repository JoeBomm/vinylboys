import dayjs from "@/src/lib/dayjs";
import { User } from "@/src/types/user";

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

export interface GroupDetailsReadModel {
  groupName: string,
  currentThemeName: string,
  currentThemeDescription: string,
  themeEndDateUtc: string,
  themePickUserName: string,
  nextThemePickUserName:string,
}

export interface GroupDetailsDto {
  groupName: string,
  currentThemeName: string,
  currentThemeDescription: string,
  themeEndDateUtc: string,
  themePickUserName: string,
  nextThemePickUserName:string,
}

export function toGroupDetailsDto(model: GroupDetailsReadModel): GroupDetailsDto {
  return {  
    groupName: model.groupName,
    currentThemeName: model.currentThemeName,
    currentThemeDescription: model.currentThemeDescription,
    themeEndDateUtc: dayjs(model.themeEndDateUtc).format("ddd[,] MMM D [at] hh:mma"),
    themePickUserName: model.themePickUserName,
    nextThemePickUserName: model.nextThemePickUserName,
  }
}