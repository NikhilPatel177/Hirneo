import UserModel from '@models/userModel.js';

const slugify = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
};

export const generateUniqueUsername = async (fullName: string) => {
  let base = slugify(fullName);
  let username = base;
  let count = 0;

  while (await UserModel.exists({ username })) {
    count += 1;
    username = `${base}${count}`;
  }
  return username;
};
