
export async function fetchTotalizadores(token) {
  try {
    const response = await fetch(`http://localhost:8080/admin/totalizadores`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar totalizadores");
    }

    // Garante que vai ler o JSON corretamente
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar totalizadores:", err);
    return {
      totalProdutos: 0,
      totalCategorias: 0,
      totalClientes: 0,
      totalPedidos: 0,
    }; // fallback
  }
}
