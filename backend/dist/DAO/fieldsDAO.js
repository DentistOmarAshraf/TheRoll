import { Field } from "../models/fields.js";
class FieldDAO {
    async create(field) {
        try {
            await Field.create(field);
        }
        catch (e) {
            console.log(e);
        }
    }
}
const fieldDAO = new FieldDAO();
export default fieldDAO;
//# sourceMappingURL=fieldsDAO.js.map