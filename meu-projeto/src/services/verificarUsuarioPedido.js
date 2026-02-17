import axios from "axios";

const API_URL = "http://localhost:8080/usuario";

export async function verificarUsuario(parametro) {
  try {
    const response = await axios.post(`${API_URL}/VerificarUsuario`, { parametro });
    return response.data; // retorna os dados do usuário
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // usuário não encontrado
    }
    throw error; // outros erros
  }
}