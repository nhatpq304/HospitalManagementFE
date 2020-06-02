import { Injectable } from "@angular/core";
import MedicineModel from "src/app/Models/medicine.model";

@Injectable({
  providedIn: "root",
})
export class MedicinesMappingService {
  constructor() {}

  mapMedicines(data): MedicineModel {
    return data.map((med) => {
      let medicine = new MedicineModel();

      medicine = {
        id: med.id,
        name: med.name,
        unit: med.unit,
        remark: med.remark,
      };
      return medicine;
    });
  }
}
