export function buscarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  return carrinho;
}