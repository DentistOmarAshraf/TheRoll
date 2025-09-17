import type { Types } from "mongoose";

export interface ITemplateDAO {
  section: Types.ObjectId,
  title: string,
  intro?: string,
  middle?: string,
  final?: string,
  summary?: string,
  fields: Types.ObjectId[],
}