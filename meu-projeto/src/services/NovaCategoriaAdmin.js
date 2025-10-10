export async function createCategoria({ nome, descricao, ativo }) {
  try {
    const response = await fetch(`http://localhost:8080/categoria/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, ativo }),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar categoria");
    return await response.json();
  } catch (error) {
    console.error("Erro no createCategoria:", error);
    throw error;
  }
}

