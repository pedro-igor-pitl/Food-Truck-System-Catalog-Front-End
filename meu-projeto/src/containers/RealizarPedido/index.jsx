import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Main,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Label,
  Input,
  Button,
  NomeProduto,
  QuantidadeProduto,
  PrecoProduto,
  DivProdutoCarrinho,
  DivPaiProdutosCarrinho,
} from "./styles.js";

import { buscarCarrinho } from "../../services/carrinhoService";

export default function RevisarPedido() {
  const location = useLocation();

  const usuarioRecebido = location.state?.usuario;
  const emailDigitado = location.state?.email || "";

  const [usuario, setUsuario] = useState({
    nome: usuarioRecebido?.nome || "",
    email: usuarioRecebido?.email || emailDigitado,
    telefone: usuarioRecebido?.telefone || ""
  });

  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  async function carregarCarrinho() {
    try {
      const carrinhoData = await buscarCarrinho();
      setCarrinho(carrinhoData);
    } catch (error) {
      console.error("Erro ao carregar carrinho", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Main>
      <Container>
        <Header>
          <Title>Revisar Pedido</Title>
          <Subtitle>Confira suas informações antes de finalizar.</Subtitle>
        </Header>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Form>

            <Label>Nome *</Label>
            <Input
              value={usuario.nome || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, nome: e.target.value })
              }
            />

            <Label>Email *</Label>
            <Input
              type="email"
              value={usuario.email || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
            />

            <Label>Telefone *</Label>
            <Input
              value={usuario.telefone || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, telefone: e.target.value })
              }
            />

            <Label>Itens do Carrinho</Label>
            <DivPaiProdutosCarrinho>
              <hr/>
              {carrinho.map((item) => (
                <DivProdutoCarrinho key={item.id}>
                  <NomeProduto>{item.produto}</NomeProduto>
                  <QuantidadeProduto>Quantidade: {item.quantidade}</QuantidadeProduto>
                  <PrecoProduto>Preço: R$ {item.preco}</PrecoProduto>
                  <hr />
                </DivProdutoCarrinho>
              ))}
            </DivPaiProdutosCarrinho>

            <Button type="submit">
              Finalizar Pedido
            </Button>

          </Form>
        )}
      </Container>
    </Main>
  );
}