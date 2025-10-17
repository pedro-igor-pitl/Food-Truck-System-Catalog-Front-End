import axios from 'axios';
export const cadastrarProduto = async (formData, selectedCategoriaId) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/produto/cadastrar/${selectedCategoriaId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
