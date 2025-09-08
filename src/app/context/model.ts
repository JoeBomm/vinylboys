export interface ThemeReadModel {
  groupId: number,
  pickerUserId: string,
  groupThemeId: number | null,
  themeName: string | null
  description: string | null
}

export interface ThemeDto {
  GroupId: number,
  PickerUserId: string,
  GroupThemeId: number | null,
  ThemeName: string | null
  Description: string | null
}

export function toThemeDto(model: ThemeReadModel): ThemeDto {
    const dto: ThemeDto = {
        GroupId: model.groupId,
        PickerUserId: model.pickerUserId,
        GroupThemeId: model.groupThemeId,
        ThemeName: model.themeName,
        Description: model.description
    }
    return dto;
}