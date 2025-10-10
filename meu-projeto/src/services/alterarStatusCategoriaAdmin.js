export async function alterarStatusCategoria(id) {
  try {
    const response = await fetch(`http://localhost:8080/categoria/alternar-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    // Se a resposta for 204 (sem conteúdo), significa que a alteração foi bem-sucedida
    if (response.status === 204) {
      return { status: 204 }; // Retorna apenas o status
    }

    // Para qualquer outro status que tenha conteúdo, você pode processar o corpo da resposta
    if (!response.ok) {
      throw new Error(`Erro ao alterar categoria (status ${response.status})`);
    }

    // Se a resposta for 200 OK ou qualquer outro status com conteúdo, processa o corpo
    return await response.json();
  } catch (error) {
    console.error('Erro ao alterar categoria:', error);
    throw error;
  }
}
