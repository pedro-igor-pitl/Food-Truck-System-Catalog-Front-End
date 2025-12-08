import axios from 'axios';

export async function listaProdutosCatalogo() {
    try {
        const response = await axios.get("http://localhost:8080/home/lista", {
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