import joi from "joi";

const regExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

export const uuidSchema = joi.string().uuid({
  version: ["uuidv4", "uuidv5"],
  separator: "-",
});

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp(regExp)).required(),
  firstname: joi.string().min(2).max(50).required(),
  lastname: joi.string().min(2).max(50).required(),
  bio: joi.string().max(500),
  phoneNumber: joi.string().min(6).max(15).pattern(new RegExp("^[0-9]")),
  avatar: joi.string().base64(),
  avatarUrl: joi.string().uri(),
});
