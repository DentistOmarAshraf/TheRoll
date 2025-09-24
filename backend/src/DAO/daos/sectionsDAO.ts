import { Sections } from "../../models/schemas/sections.js";
import type { ISections } from "../../models/interfaces/ISections.js";
import type { ISectionsDAO } from "../interfaces/ISectionsDAO.js";
import { Types } from "mongoose";
import { Templates } from "../../models/schemas/tmeplates.js";

class SectionDAO {
  async getAllSections(
    page: number,
    limit: number
  ): Promise<ISections[] | null> {
    const start = (page - 1) * limit;
    try {
      const listOfSections = await Sections.find().skip(start).limit(limit);
      return listOfSections;
    } catch (err) {
      throw err;
    }
  }

  async createNewSection(name: ISectionsDAO): Promise<ISections | null> {
    try {
      const newSection = await Sections.create(name);
      return newSection;
    } catch (err) {
      throw err;
    }
  }

  async deleteSectionById(
    id: string | Types.ObjectId
  ): Promise<ISections | null> {
    try {
      await Templates.deleteMany({ section: id });
      const deleted = await Sections.findByIdAndDelete(id);
      if (!deleted) throw new Error("Not Found");
      return deleted;
    } catch (err) {
      throw err;
    }
  }

  async updateSectionById(
    id: string | Types.ObjectId,
    newData: ISectionsDAO
  ): Promise<ISections | null> {
    try {
      const updated = await Sections.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
      });
      return updated;
    } catch (err) {
      throw err;
    }
  }
}

const sectionDAO = new SectionDAO();
export default sectionDAO;
