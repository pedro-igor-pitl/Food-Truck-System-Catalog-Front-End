export async function createCategoria({ nome, descricao, ativo }) {

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:8080/categoria/cadastrar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          descricao,
          ativo
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erro no createCategoria:", error);
    throw error;
  }
}