import axios from 'axios';

interface DeleteResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

export const deleteCoder = async (id: string): Promise<DeleteResponse> => {
  try {
    const response = await axios.delete(`/api/coders?id=${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: "Error al eliminar" };
  }
};