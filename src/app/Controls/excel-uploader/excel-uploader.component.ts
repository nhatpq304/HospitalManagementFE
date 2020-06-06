import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MedicinesService } from "src/app/Services/Medicines/medicines.service";

@Component({
  selector: "excel-uploader",
  templateUrl: "./excel-uploader.component.html",
  styleUrls: ["./excel-uploader.component.scss"],
})
export class ExcelUploaderComponent implements OnInit {
  base64: string;
  resource;
  constructor(public medicinesService: MedicinesService) {}

  ngOnInit(): void {
    this.initResource();
  }

  initResource() {
    this.resource = {
      browseFile: "Tìm file",
    };
  }

  async onFileChange($event) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.base64 = await this.getBase64(file);
    } else {
      this.base64 = null;
    }
  }

  onUploadClick() {
    return this.medicinesService.saveMedicines(this.base64);
  }

  getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
