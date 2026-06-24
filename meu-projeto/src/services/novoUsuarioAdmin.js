import axios from "axios";

export async function createUsuario({
  nome,
  ativo,
  email,
  senha,
  telefone,
  tipo,
  endereco
}) {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8080/usuario/cadastrar",
      {
        nome,
        ativo,
        email,
        senha,
        telefone,
        tipo,
        endereco: {
          rua: endereco.rua,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          cep: endereco.cep,
          complemento: endereco.complemento || ""
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Erro no createUsuario:",
      error.response?.data || error.message
    );

    throw error;
  }
}