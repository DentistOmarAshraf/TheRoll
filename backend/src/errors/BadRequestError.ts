import AppErrors from "./AppErrors.js";

export default class BadRequestError extends AppErrors {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
