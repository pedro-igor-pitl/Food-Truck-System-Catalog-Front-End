import axios from 'axios';

export const cadastrarProduto = async (formData, selectedCategoriaId) => {
  try {

    const token = localStorage.getItem("token");

    console.log("TOKEN CADASTRAR PRODUTO:", token);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post(
      `http://localhost:8080/produto/cadastrar/${selectedCategoriaId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    throw error;
  }
};