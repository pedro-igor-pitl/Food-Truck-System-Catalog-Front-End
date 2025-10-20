import axios from "axios";

export async function listaUsuarios() {
    try {
        const response = await axios.get("http://localhost:8080/usuario/lista", {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}