import axios from "axios";

export async function listaUsuarios() {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/usuario/lista",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}