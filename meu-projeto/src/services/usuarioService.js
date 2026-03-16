export function buscarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  return usuario;
}