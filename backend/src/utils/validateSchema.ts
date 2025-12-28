import z from "zod";
import BadRequestError from "../errors/BadRequestError.js";

const validate = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    if (issue?.code === "invalid_union") {
      throw new BadRequestError(
        `path: (${issue.path}) ${issue.code} ${issue.message}`
      );
    }
    throw new BadRequestError(issue?.message);
  }
  return result.data as z.infer<T>;
};

export default validate;
