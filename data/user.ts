interface User {
  id: number;
  email: string;
  name: string | null;
}

export const readUser = ({ id, email, name }: User) => ({
  id,
  email,
  name,
});
