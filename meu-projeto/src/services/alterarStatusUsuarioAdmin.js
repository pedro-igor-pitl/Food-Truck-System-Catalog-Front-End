export async function alterarStatusUsuarioAdmin(id) {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/usuario/alternar-status/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return { status: 204 };
    }

    if (!response.ok) {
      throw new Error(
        `Erro ao alterar usuário (status ${response.status})`
      );
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao alterar usuário:", error.message);
    throw error;
  }
}