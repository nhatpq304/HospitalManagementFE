import { Injectable } from "@angular/core";
import Toastify from "src/assets/js/addons/toastify";

@Injectable({
  providedIn: "root",
})
export default class ToastService {
  resource;
  constructor() {}

  initReource() {
    this.resource = {
      errorColor: "linear-gradient(135deg, #f78888, #f72525)",
    };
  }

  show(config) {
    let color = "linear-gradient(135deg, #73a5ff, #5477f5)";

    switch (config.type) {
      case "error": {
        color = "linear-gradient(135deg, #f78888, #f72525)";
        break;
      }
      case "success": {
        color = "linear-gradient(135deg, #86f58c, #25f730)";
        break;
      }
    }

    Toastify({
      text: config.text,

      destination: config.destination || null,
      // Open destination in new window
      newWindow: config.newWindow || false,
      // Show toast close icon
      close: config.close || false,
      // Toast position - top or bottom
      gravity: config.gravity || "bottom",
      // Toast position - left, right, or center
      position: config.position || "right",
      // Background color
      backgroundColor: color,
      // Avatar
      avatar: config.avatar || "",
      // Additional classes for the toast
      classes: config.classes || "",
      // Prevents dismissing of toast on hover
      stopOnFocus: config.stopOnFocus || true,

      callback: config.callback || function () {},
    }).showToast();
  }
}
