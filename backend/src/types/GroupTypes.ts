//Author : Jainish Patel, Jay Patel

import { ObjectId } from "mongodb";
export interface Group {
  _id?: ObjectId;
  projectId: string;
  projectName: string;
  memberList: string[];
}
