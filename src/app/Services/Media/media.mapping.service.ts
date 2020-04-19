import { Injectable } from "@angular/core";
import AvatarSaveModel from 'src/app/Models/avatarSave.model';

@Injectable({
  providedIn: "root",
})
export class MediaMappingService {
  constructor() {}

  mapSaveAvatarData(base64: string, userId: string) {
    let media = new AvatarSaveModel();
    media.file = base64;
    media.media_type = "AVATAR";
    media.user_id = userId;

    return media;
  }
}
