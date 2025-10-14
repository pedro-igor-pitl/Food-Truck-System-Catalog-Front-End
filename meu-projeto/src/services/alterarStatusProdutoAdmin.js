export async function alterarStatusProdutoAdmin(id) {
  try {
    const response = await fetch(`http://localhost:8080/produto/alternar-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });


    if (response.status === 204) {
      return { status: 204 }; 
    }

  
    if (!response.ok) {
      throw new Error(`Erro ao alterar produto (status ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao alterar Produto:', error.message);
    throw error;
  }
}
