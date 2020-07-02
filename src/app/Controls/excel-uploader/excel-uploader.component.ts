import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import { MedicinesService } from "src/app/Services/Medicines/medicines.service";

@Component({
  selector: "excel-uploader",
  templateUrl: "./excel-uploader.component.html",
  styleUrls: ["./excel-uploader.component.scss"],
})
export class ExcelUploaderComponent implements OnChanges {
  base64: string;
  resource;
  isDisabled: boolean;
  @Input() permission;
  @Output() onUploadComplete = new EventEmitter();
  constructor(public medicinesService: MedicinesService) {}

  ngOnChanges(obj) {
    if (obj?.permission?.value) {
      this.initResource();
    }
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

  async onUploadClick() {
    if (!this.permission || !this.isFileChosen) {
      return;
    }
    this.isDisabled = true;
    try {
      await this.medicinesService.saveMedicines(this.base64);
      this.onUploadComplete.emit({ value: true });
    } catch {
      this.onUploadComplete.emit({ value: false });
    }
    this.isDisabled = false;
  }

  getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  get isFileChosen(): boolean {
    return !!this.base64;
  }
}
