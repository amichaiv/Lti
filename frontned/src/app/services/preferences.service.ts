import { Injectable } from "@angular/core";
import { TableElemant } from "../components/preferences/models/assignment-table.model";
const Assignments: TableElemant[] = [
  {
    name: "Lab 1",
    student: "Ben Hornedo",
    email: "benh@codevalue.net",
    budget: 150,
    position: 1
  },
  {
    name: "Lab 1",
    student: "Moti Hadash",
    email: "motih@codevalue.net",
    budget: 150,
    position: 2
  },
  {
    name: "Lab 1",
    student: "Suzan Zaher",
    email: "suzanz@codevalue.net",
    budget: 150,
    position: 3
  },
  {
    name: "Lab 1",
    student: "Yarin Mansour",
    email: "yarinm@codevalue.net",
    budget: 150,
    position: 4
  },
  {
    name: "Lab 1",
    student: "Amichai Vaknin",
    email: "amichaiv@codevalue.net",
    budget: 150,
    position: 5
  },
  {
    name: "Lab 1",
    student: "Alex Pshul",
    email: "alexp@codevalue.net",
    budget: 150,
    position: 6
  },
  {
    name: "Lab 1",
    student: "Itay Yaffe",
    email: "itayy@codevalue.net",
    budget: 150,
    position: 7
  }
];
@Injectable({
  providedIn: "root"
})
export class PreferencesService {
  constructor() {}

  getAssignments(): TableElemant[] {
    return Assignments;
  }
}
