export const fixAndGetName = (name: string, email: string) => {
  if (name === 'null null') {
    return email.split('@')[0];
  } else {
    return name;
  }
};
