import axios from "axios";

const API_URL = "http://localhost:8080/usuario";

export async function GETUsuarioPorEmailRetorno(email) {
  try {
    // Colocando o email diretamente na URL e codificando caracteres especiais
    const response = await axios.get(`${API_URL}/email/${encodeURIComponent(email)}`);
    console.log(response.data);
    return response.data; // retorna os dados do usuário
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // usuário não encontrado
    }
    throw error; // outros erros
  }
}