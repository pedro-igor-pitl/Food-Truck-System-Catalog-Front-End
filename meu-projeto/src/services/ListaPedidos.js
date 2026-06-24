import axios from "axios";

export async function listaPedidos() {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/pedido/lista",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}