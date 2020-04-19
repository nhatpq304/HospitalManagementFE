import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { LocalStorageService } from "./LocalStorage/local-storage.service";
import _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class RestfulService {
  httpOptions;

  constructor(
    public http: HttpClient,
    public localStorageService: LocalStorageService
  ) {}

  public get(api, options?: any): Observable<any> {
    this.setHttpOptions();

    return this.http.get(api, this.httpOptions);
  }

  public delete(api, options?: any): Observable<any> {
    this.setHttpOptions();

    return this.http.delete(api, this.httpOptions);
  }

  public post(api, body): Observable<any> {
    this.setHttpOptions();

    return this.http.post(api, body, this.httpOptions);
  }

  public put(api, body): Observable<any> {
    this.setHttpOptions();

    return this.http.put(api, body, this.httpOptions);
  }

  private setHttpOptions() {
    let authToken = this.localStorageService.getItem("token");

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer  ${authToken}`,
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
