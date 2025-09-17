import { Sections } from "../../models/schemas/sections.js";
class SectionDAO {
    async getAllSections(page, limit) {
        const start = (page - 1) * limit;
        try {
            const listOfSections = await Sections.find().skip(start).limit(limit);
            return listOfSections;
        }
        catch (e) {
            throw new Error(`SectionDAO.getAllSections ${e}`);
        }
    }
    async createNewSection(name) {
        try {
            const newSection = await Sections.create(name);
            return newSection;
        }
        catch (e) {
            throw new Error(`SectionDAO.createNewSection ${e}`);
        }
    }
    async deleteSectionById(id) {
        try {
            const deleted = await Sections.findByIdAndDelete(id);
            return deleted;
        }
        catch (e) {
            throw new Error(`SectionDAO.deleteSectionById ${e}`);
        }
    }
    async updateSectionById(id, newData) {
        try {
            const updated = await Sections.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
            return updated;
        }
        catch (e) {
            throw new Error(`SectionDAO.updateSectionById ${e}`);
        }
    }
}
const sectionDAO = new SectionDAO();
export default sectionDAO;
//# sourceMappingURL=sectionsDAO.js.map