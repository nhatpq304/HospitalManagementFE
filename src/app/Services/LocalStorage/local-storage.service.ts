import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  setItem(name: string, data: any) {
    return localStorage.setItem(
      name,
      typeof data === "string" ? data : JSON.stringify(data)
    );
  }

  getItem(name: string) {
    let item = localStorage.getItem(name);

    return item;
  }

  removeItem(name: string) {
    return localStorage.removeItem(name);
  }
}
