import axios from "axios";

export default async function buscarUsuarioEditar(idUsuario) {
    try {
        const response = await axios.get(
            `http://localhost:8080/usuario/${idUsuario}`
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