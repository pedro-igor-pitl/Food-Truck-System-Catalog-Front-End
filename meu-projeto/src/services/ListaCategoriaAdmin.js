export default async function listaCategoriaAdmin() {
  try {

    const token = localStorage.getItem("token");

    console.log("TOKEN CATEGORIA:", token);

    const response = await fetch(
      "http://localhost:8080/categoria/lista",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias (${response.status})`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return [];
  }
}