import { Sections } from "../../models/schemas/sections.js";
import type { ISections } from "../../models/interfaces/ISections.js";
import type { ISectionsDAO } from "../interfaces/ISectionsDAO.js";
import { Types } from "mongoose";
import { Templates } from "../../models/schemas/tmeplates.js";
import NotFoundError from "../../errors/NotFoundError.js";

class SectionDAO {
  async countDocument(): Promise<number> {
    const count = await Sections.countDocuments();
    return count;
  }

  async getAllSections(
    page: number,
    limit: number
  ): Promise<ISections[] | null> {
    const start = (page - 1) * limit;

    const listOfSections = await Sections.find().skip(start).limit(limit);
    return listOfSections;
  }

  async createNewSection(name: ISectionsDAO): Promise<ISections | null> {
    const newSection = await Sections.create(name);
    return newSection;
  }

  async deleteSectionById(
    id: string | Types.ObjectId
  ): Promise<ISections | null> {
    await Templates.deleteMany({ section: id });
    const deleted = await Sections.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundError("Section Not Found");
    return deleted;
  }

  async updateSectionById(
    id: string | Types.ObjectId,
    newData: ISectionsDAO
  ): Promise<ISections | null> {
    const updated = await Sections.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundError("Section Not Found");
    return updated;
  }
}

const sectionDAO = new SectionDAO();
export default sectionDAO;
