import axios from 'axios';

export async function listaPedidos() {
    try {
        const response = await axios.get("http://localhost:8080/pedido/lista");
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}