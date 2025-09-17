import { Templates } from "../../models/schemas/tmeplates.js";
class TemplateDAO {
    async createNewTemplate(template) {
        try {
            const newTemplate = await Templates.create(template);
            return newTemplate;
        }
        catch (e) {
            throw new Error(`TemplateDAO.createNewTemplate ${e}`);
        }
    }
    async getTemplatesBySectionID(id, page, limit) {
        const start = (page - 1) * limit;
        try {
            const listOfTemplates = await Templates.find({ section: id })
                .skip(start)
                .limit(limit)
                .populate("fields");
            return listOfTemplates;
        }
        catch (e) {
            throw new Error(`TemplateDAO.getTemplatesBySectionID ${e}`);
        }
    }
}
const templateDAO = new TemplateDAO();
export default templateDAO;
//# sourceMappingURL=templateDAO.js.map