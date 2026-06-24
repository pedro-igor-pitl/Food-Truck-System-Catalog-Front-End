import axios from "axios";

export default async function buscarUsuarioEditar(idUsuario) {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/usuario/${idUsuario}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Usuario buscado:", response.data);

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar usuario:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    alert("Erro ao buscar usuario.");
    return null;
  }
}