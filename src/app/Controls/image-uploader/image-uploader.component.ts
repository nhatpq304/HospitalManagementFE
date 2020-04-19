import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "image-uploader",
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.scss"],
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  @Input() source: string;
  @Input() config: any;
  @Input() parentForm: FormGroup;
  @Output() onCropDone = new EventEmitter();
  resource;
  previewUrl;
  defaultSource = "../../../assets/img/avatar.png";
  constructor() {}

  ngOnChanges(changeObj) {
    if (changeObj?.source?.currentValue) {
      this.source = this.source;
    }
  }

  ngOnInit(): void {
    this.initResource();
  }

  initResource() {
    this.resource = {
      avatarButton: "Tải ảnh lên",
      browseFile: "Chọn ảnh",
      saveModal: "Lưu",
      closeModal: "Đóng",
      uploadModal: "Tải ảnh lên",
    };
  }

  onFileChange($event) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.preview(file);
    }
  }

  preview(file: File) {
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      setTimeout(() => {
        this.initCropper();
      });
    };
  }

  onUploadClick() {
    this.toggleModal();
  }

  crop() {
    var imageData = ($("#image") as any)
      .cropper("getCroppedCanvas")
      .toDataURL();

    this.onCropDone.emit({ data: imageData });
    this.toggleModal();
  }

  private initCropper() {
    ($("#image") as any).cropper({
      aspectRatio: 3 / 4,
      minContainerWidth: 400,
      minContainerHeight: 300,
    });
  }

  private toggleModal() {
    ($("#imageModal") as any).modal("toggle");
  }
}
