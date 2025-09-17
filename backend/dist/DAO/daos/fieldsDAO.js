import { Fields } from "../../models/schemas/fields.js";
class FieldDAO {
    async getFieldById(id) {
        try {
            const result = await Fields.findById(id);
            return result;
        }
        catch (e) {
            throw new Error(`FieldDAO.getFiledById: ${e}`);
        }
    }
    async getAllFields(page, limit) {
        const start = (page - 1) * limit;
        try {
            const result = await Fields.find().skip(start).limit(limit);
            return result;
        }
        catch (e) {
            throw new Error(`FieldDAO.getAllFields: ${e}`);
        }
    }
    async createNewField(field) {
        try {
            const result = await Fields.create(field);
            return result;
        }
        catch (e) {
            throw new Error(`FieldDAO.createNewField: ${e}`);
        }
    }
    async deleteFieldByID(id) {
        try {
            const deleted = await Fields.findByIdAndDelete(id);
            return deleted;
        }
        catch (e) {
            throw new Error(`FieldDAO.deleteFieldByID: ${e}`);
        }
    }
}
const fieldDAO = new FieldDAO();
export default fieldDAO;
//# sourceMappingURL=fieldsDAO.js.map