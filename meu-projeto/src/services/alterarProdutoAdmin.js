import axios from 'axios';

export async function buscarProdutoPorId(idProduto) {
    try {
        // Usando template literal para interpolar a variável idProduto corretamente
        const response = await axios.get(`http://localhost:8080/produto/${idProduto}`);
        console.log("Produto buscado:", response.data);
        
        if (response.data) {
            return response.data;  // Retorna os dados do produto
        } else {
            console.error("Produto não encontrado");
            alert("Produto não encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        alert("Erro ao buscar o produto. Tente novamente.");
        return null;
    }
}


export async function alterarProdutoAdmin(idProduto, formData, selectedCategoriaId) {
  const response = await axios.put(
    `http://localhost:8080/produto/atualizar/${idProduto}/${selectedCategoriaId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  console.log("Produto alterado:", response.data);
  return response.data;
}

