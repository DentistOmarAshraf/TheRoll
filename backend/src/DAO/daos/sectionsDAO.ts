import { Sections } from "../../models/schemas/sections.js";
import type { ISections } from "../../models/interfaces/ISections.js";
import type { ISectionsDAO } from "../interfaces/ISectionsDAO.js";
import type { Types } from "mongoose";

class SectionDAO {
  async getAllSections(
    page: number,
    limit: number
  ): Promise<ISections[] | null> {
    const start = (page - 1) * limit;
    try {
      const listOfSections = await Sections.find().skip(start).limit(limit);
      return listOfSections;
    } catch (e) {
      throw new Error(`SectionDAO.getAllSections ${e}`);
    }
  }

  async createNewSection(name: ISectionsDAO): Promise<ISections | null> {
    try {
      const newSection = await Sections.create(name);
      return newSection;
    } catch (e) {
      throw new Error(`SectionDAO.createNewSection ${e}`);
    }
  }

  async deleteSectionById(id: string | Types.ObjectId): Promise<ISections |null> {
    try {
      const deleted = await Sections.findByIdAndDelete(id)
      return deleted;
    }catch (e) {
      throw new Error(`SectionDAO.deleteSectionById ${e}`)
    }
  }

  async updateSectionById(id: string | Types.ObjectId, newData: ISectionsDAO): Promise<ISections | null> {
    try {
      const updated = await Sections.findByIdAndUpdate(id, newData, {new: true, runValidators: true})
      return updated;
    } catch (e) {
      throw new Error(`SectionDAO.updateSectionById ${e}`)
    }
  }
}

const sectionDAO = new SectionDAO();
export default sectionDAO;
