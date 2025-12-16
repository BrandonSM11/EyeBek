  import axios from "axios";


interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: ContactData) => {
  const response = await axios.post("/api/contact", data);
  return response.data;
};
