import axios from "axios";

export async function buscarProdutoPorId(idProduto) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/produto/${idProduto}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Produto buscado:", response.data);

    if (response.data) {
      return response.data;
    }

    console.error("Produto não encontrado");
    return null;

  } catch (error) {
    console.error("Erro ao buscar o produto:", error);
    throw error;
  }
}

export async function alterarProdutoAdmin(
  idProduto,
  formData,
  selectedCategoriaId
) {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `http://localhost:8080/produto/atualizar/${idProduto}/${selectedCategoriaId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log("Produto alterado:", response.data);

  return response.data;
}