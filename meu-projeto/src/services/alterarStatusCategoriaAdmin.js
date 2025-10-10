export async function alterarStatusCategoria(id) {
  try {
    const response = await fetch(`http://localhost:8080/categoria/alternar-status/${id}`, {
      method: "PUT",
    });

    if (response.status === 204) {
      console.log("Categoria atualizada com sucesso.");
      return true;
    }

    if (!response.ok) {
      throw new Error(`Erro ao alterar categoria (status ${response.status})`);
    }

    const text = await response.text();
    if (!text) return true; 
    return JSON.parse(text);

  } catch (error) {
    console.error("Erro no AlterarCategoria:", error);
    throw error;
  }
}
