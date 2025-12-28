import z from "zod";
import { PHONE_REGEX } from "../utils/regexConstants.js";

const zBaseUser = z.object({
  fullName: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "الاسم مطلوب" : "الاسم يجب ان يكون نصا",
    })
    .trim()
    .min(3, "الاسم قصير جدا")
    .max(30, "الاسم طويل جدا")
    .regex(/^[\u0621-\u064A\s]+$/, "الاسم يجب أن يحتوي على حروف عربية فقط"),
  email: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "البريد الالكترني مطلوب"
          : "البريد الالكتروني يجب ان يكون نصا",
    })
    .trim()
    .email("الايميل غير صالح")
    .min(3, "الايميل قصير جدا")
    .max(30, "الايميل طويل جدا"),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "كلمه المرور مطلوبه"
          : "كلمه المرور يجب ان تكون نصا",
    })
    .min(8, "كلمه المرور يجب الا تقل عن 8 احرف")
    .max(20, "كلمه المرور طويله"),
  phone: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "رقم الموبايل مطلوب"
          : "رقم الموبايل يجب ان يكون نصا",
    })
    .regex(PHONE_REGEX, "رقم الموبايل غير صالح"),
});

export const zUserLawyer = zBaseUser.extend({
  type: z.literal("Lawyer"),
  syndicateId: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "رقم تسحيل النقابه مطلوب"
          : "رقم تسجيل النقابه يجب ان يكون نصا",
    })
    .min(5, "رقم تسجيل النقابه قصير جدا")
    .max(20, "رقم تسجيل النقابه طويل جدا"),
});

export const zUserStudent = zBaseUser.extend({
  type: z.literal("Student"),
  university: z.string("يجب اختيار الجامعه"),
});

export const zUserRegSchema = z.discriminatedUnion("type", [
  zUserLawyer,
  zUserStudent,
]);

export const zUpdateUserLawyer = zUserLawyer.omit({ email: true }).partial();
export const zUpdateUserStudent = zUserStudent.omit({ email: true }).partial();

export const zUserUpdateSchema = z.discriminatedUnion("type", [
  zUpdateUserLawyer.extend({ type: z.literal("Lawyer") }),
  zUpdateUserStudent.extend({ type: z.literal("Student") }),
]);
