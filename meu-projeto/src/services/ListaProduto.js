import axios from 'axios';

export async function listaProdutos() {
    try {
        const response = await axios.get("http://localhost:8080/produto/lista", {
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
