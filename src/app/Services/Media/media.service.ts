import { Injectable } from "@angular/core";
import { MediaMappingService } from "./media.mapping.service";
import apis from "../api.routes";
import { RestfulService } from "../restful.service";
import MediaModel from "src/app/Models/media.model";

@Injectable({
  providedIn: "root",
})
export class MediaService {
  constructor(
    public mediaMappingService: MediaMappingService,
    public restfulService: RestfulService
  ) {}

  saveAvatar(base64: string, userId: string) {
    const api = apis.saveMedia;
    const dataBody = this.mediaMappingService.mapSaveAvatarData(base64, userId);

    return this.restfulService.post(api, dataBody).toPromise();
  }

  deleteAvatar(avatar: MediaModel) {
    const api = apis.delete.replace("{id}", avatar.id);

    return this.restfulService.delete(api).toPromise();
  }
}
