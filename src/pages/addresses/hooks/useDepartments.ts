import { v4 as uuid } from "uuid";

// dummy data
const departments: Department[] = [
  { id: uuid(), name: "Department 1" },
  { id: uuid(), name: "Department 2" },
  { id: uuid(), name: "Department 3" },
  { id: uuid(), name: "Department 4" },
];

export const useDepartments = () => {
  return departments;
};
