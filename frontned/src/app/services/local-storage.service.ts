import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {}

  getItem(key: string): string {
    return localStorage.getItem(key);
  }
  setItem(key, value): void {
    localStorage.setItem(key, value);
  }
  clear() {
    localStorage.clear;
  }
  getLength(): number {
    return localStorage.length;
  }

  removeItem(key): void {
    localStorage.removeItem(key);
  }
}
