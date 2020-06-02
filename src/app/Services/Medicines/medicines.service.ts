import { Injectable } from "@angular/core";
import { RestfulService } from "../restful.service";
import apis from "../api.routes";
import { MedicinesMappingService } from "./medicines.mapping.service";
import MedicineModel from 'src/app/Models/medicine.model';

@Injectable({
  providedIn: "root",
})
export class MedicinesService {
  constructor(
    public restfulService: RestfulService,
    public medicinesMappingService: MedicinesMappingService
  ) {}

  getMedicines(): Promise<MedicineModel[]> {
    const api = apis.getMedicines;

    return this.restfulService
      .get(api)
      .toPromise()
      .then((data) => {
        return this.medicinesMappingService.mapMedicines(data);
      });
  }
}
