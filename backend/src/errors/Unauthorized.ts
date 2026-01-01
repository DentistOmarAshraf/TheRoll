import AppErrors from "./AppErrors.js";

export default class Unauthorized extends AppErrors {
  constructor(message = "Bad Request") {
    super(message, 401);
  }
}