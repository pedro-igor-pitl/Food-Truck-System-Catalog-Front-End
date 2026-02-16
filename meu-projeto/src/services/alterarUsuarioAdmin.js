import axios from "axios";

export async function alterarUsuario(id, usuario) {
  try {
    const response = await axios.put(
      `http://localhost:8080/usuario/atualizar/${id}`,
      usuario,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Erro ao alterar usuário:",
      error.response?.data || error.message
    );

    throw error;
  }
}