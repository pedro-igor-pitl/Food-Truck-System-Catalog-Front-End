export async function listaProdutos(token) {
    try {
        const response = await fetch("http://localhost:8080/produto/lista", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}