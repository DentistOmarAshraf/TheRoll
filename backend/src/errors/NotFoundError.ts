import AppErrors from "./AppErrors.js";

export default class NotFoundError extends AppErrors {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
