export default async function listaCategoriaAdmin() {
  try {
    const response = await fetch("http://localhost:8080/categoria/lista");
    if (!response.ok) {
      throw new Error("Erro ao buscar categorias");
    }
    const data = await response.json();
    return data;  // retorna o array de categorias
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return []; // retorna array vazio em caso de erro
  }
}
