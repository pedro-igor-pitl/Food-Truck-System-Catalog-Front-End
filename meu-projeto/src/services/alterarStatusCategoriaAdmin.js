export async function alterarStatusCategoria(id) {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(
      `http://localhost:8080/categoria/alternar-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (response.status === 204) {
      return { status: 204 };
    }

    if (!response.ok) {
      throw new Error(`Erro ao alterar categoria (status ${response.status})`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao alterar categoria:", error);
    throw error;
  }
}