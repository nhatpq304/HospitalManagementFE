import { Injectable } from "@angular/core";
import { RestfulService } from "../restful.service";
import apis from "../api.routes";
import { ExaminationsMappingService } from "./examinations.mapping.service";

@Injectable({
  providedIn: "root",
})
export class ExaminationsService {
  constructor(
    public restfulService: RestfulService,
    public examinationsMappingService: ExaminationsMappingService
  ) {}

  saveExamination(data: any) {
    const api = apis.saveExamination;
    const dataBody = this.examinationsMappingService.mappingSaveExamination(
      data
    );

    return this.restfulService.post(api, dataBody).toPromise();
  }

  getExamination(id: string) {
    const api = apis.getExamination.replace("{id}", id);

    return this.restfulService
      .get(api)
      .toPromise()
      .then((result) =>
        this.examinationsMappingService.mappingExamination(result.data)
      );
  }
}
