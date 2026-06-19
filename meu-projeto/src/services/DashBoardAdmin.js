export async function fetchTotalizadores(token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("http://localhost:8080/admin/totalizadores", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar totalizadores");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar totalizadores:", err);
    return {
      totalProdutos: 0,
      totalCategorias: 0,
      totalClientes: 0,
      totalPedidos: 0,
    };
  }
}