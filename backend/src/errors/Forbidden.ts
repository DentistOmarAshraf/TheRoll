import AppErrors from "./AppErrors.js";

export default class ForbiddenError extends AppErrors {
  constructor(message = "forbidden") {
    super(message, 403);
  }
}
