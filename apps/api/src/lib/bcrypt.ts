import * as bcrypt from "bcrypt";

export const comparePassword = async (
  candidatePass: string,
  hashedPass: string
) => {
  return await bcrypt.compare(candidatePass, hashedPass);
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
