export async function atualizarCategoria(id, nome, ativo, descricao) {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    try {
        const response = await fetch(
            `http://localhost:8080/categoria/atualizar/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome,
                    ativo,
                    descricao
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao atualizar categoria (status ${response.status})`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erro no atualizarCategoria:", error);
        throw error;
    }
}