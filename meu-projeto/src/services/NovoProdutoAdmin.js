import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const cadastrarProduto = async (produto, categoriaId) => {
  try {
    const response = await axios.post(`${API_URL}/produto/cadastrar/${categoriaId}`, produto);
    return response.data;
  } catch (error) {
    throw error;
  }
};
