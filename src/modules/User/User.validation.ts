import joi from "joi";

export const uuidSchema = joi.string().uuid({
  version: ["uuidv4", "uuidv5"],
  separator: "-",
});

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
      )
    )
    .required(),
  firstname: joi.string().min(2).max(50).required(),
  lastname: joi.string().min(2).max(50).required(),
  bio: joi.string().max(500),
  phoneNumber: joi.string().min(6).max(15).pattern(new RegExp("^[0-9]")),
  avatar: joi.string().base64(),
  avatarUrl: joi.string().uri(),
});
