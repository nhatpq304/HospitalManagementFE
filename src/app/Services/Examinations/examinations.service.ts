import { Injectable } from "@angular/core";
import { RestfulService } from "../restful.service";
import apis from "../api.routes";
import { ExaminationsMappingService } from "./examinations.mapping.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExaminationsService {
  constructor(
    public restfulService: RestfulService,
    public examinationsMappingService: ExaminationsMappingService
  ) {}

  getAllExaminations() {
    const api = apis.getAllExamination;

    return this.restfulService.get(api).pipe(
      map((response) => {
        return response.data.map((data) => {
          return this.examinationsMappingService.mappingSearchExamination(data);
        });
      })
    );
  }

  saveExamination(data: any) {
    const api = apis.saveExamination;
    const dataBody = this.examinationsMappingService.mappingSaveExamination(
      data
    );

    return this.restfulService.post(api, dataBody).toPromise();
  }

  updateExamination(data: any) {
    const api = apis.updateExamination.replace("{id}", data.id);
    const dataBody = this.examinationsMappingService.mappingSaveExamination(
      data
    );

    return this.restfulService.put(api, dataBody).toPromise();
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
