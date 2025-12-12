import axios from "axios";

export const createCompany = async (
  name: string,
  phone: string,
  email: string,
  address: string,
  password: string,
) => {
  const response = await axios.post("https://eyebek-1.onrender.com/companies/register", {
    name,
    phone,
    email,
    address,
    password,
  });

  return response.data;
};
