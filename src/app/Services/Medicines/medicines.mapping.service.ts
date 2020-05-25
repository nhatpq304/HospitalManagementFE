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
        name: med.brand_name,
        originName: med.origin_name,
        remark: med.remark,
      };
      return medicine;
    });
  }
}
