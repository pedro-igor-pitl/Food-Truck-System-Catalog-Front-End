export default async function buscarUsuarioEditar(idUsuario) {
    try {
        const response = await fetch(`http://localhost:8080/usuario/${idUsuario}`);
        console.log("Usuario buscado:", response.data);

        if (response.data) {
            return response.data;
        } else {
            console.error("Usuario não encontrado");
            alert("Usuario não encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar usuario:", error);
        alert("Erro ao buscar usuario. Tente novamente.");
        return null;
    }
}