import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  membersUrl: string = "https://assignmentsmanager.azurewebsites.net/api/assignments/" + this.localStorageService.getItem("assignmentGuid") + "/members/";
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getMembers() {
    return this.http.get<User[]>(this.membersUrl)
  }

  getMember() {
    return this.http.get<User>(this.membersUrl + this.localStorageService.getItem("memberId"))
  }
}
