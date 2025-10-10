export async function atualizarCategoria(id, nome, ativo, descricao) {
    try {
        const response = await fetch(`http://localhost:8080/categoria/atualizar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, ativo, descricao }), // Enviando todos os campos necessários
        });

        if (!response.ok) throw new Error(`Erro ao atualizar categoria (status ${response.status})`);
        return await response.json();
    } catch (error) {
        console.error("Erro no atualizarCategoria:", error);
        throw error;
    }
}
