import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, publish, tap } from 'rxjs/operators'
import { ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data: any = {};
  constructor(private http: HttpClient) { }
  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
  // use(lang: string): Promise<{}> {

  //   const langPath = `assets/i18n/${lang || 'en'}.json`;
  //   const getTranslationsObservable: ConnectableObservable<{}> = this.http.get<{}>(langPath)
  //   .pipe(
  //     map(translation => Object.assign({}, translation || {})),
  //     tap(translated => this.data = translated),
  //     publish()
  //   );

  //   getTranslationsObservable.connect();

  //   return getTranslationsObservable.toPromise();
  // }
}
