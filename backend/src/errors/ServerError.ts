import AppErrors from "./AppErrors.js";

export default class ServerError extends AppErrors {
  constructor(message = "Bad Request") {
    super(message, 500);
  }
}