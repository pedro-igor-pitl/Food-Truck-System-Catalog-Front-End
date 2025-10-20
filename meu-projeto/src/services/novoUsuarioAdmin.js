import axios from "axios";

export async function createUsuario({
  nome,
  descricao,
  ativo,
  email,
  senha,
  telefone,
  endereco // objeto com rua, numero, bairro, cidade, estado, cep
}) {
  try {
    const response = await axios.post(
      "http://localhost:8080/usuario/cadastrar",
      {
        nome,
        descricao,
        ativo,
        email,
        senha,
        telefone,
        endereco
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data; // retorna o usuário criado
  } catch (error) {
    console.error("Erro no createUsuario:", error.response || error.message);
    throw error;
  }
}
