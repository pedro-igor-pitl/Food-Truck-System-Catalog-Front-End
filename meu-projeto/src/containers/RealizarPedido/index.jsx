import { useState, useEffect } from "react";
import axios from "axios";
import {
  Main,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Label,
  Input,
  Button
} from "./styles.js";

import { buscarCarrinho } from "../../services/carrinhoService";

export default function RevisarPedido() {
  const [usuario, setUsuario] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const email = localStorage.getItem("emailUsuario");

      if (email) {
        const res = await axios.get(`http://localhost:8080/usuario/email/${email}`);
        setUsuario(res.data);
      }

      const carrinhoData = await buscarCarrinho();
      setCarrinho(carrinhoData);

    } catch (error) {
      console.error("Erro ao carregar dados", error);
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

            <Label>Nome</Label>
            <Input value={usuario.nome || ""} disabled />

            <Label>Email</Label>
            <Input value={usuario.email || ""} disabled />

            <Label>Telefone</Label>
            <Input value={usuario.telefone || ""} disabled />

            <Label>Itens do Carrinho</Label>
            {carrinho.map((item) => (
              <div key={item.id}>
                <p>{item.nomeProduto}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p>Preço: R$ {item.preco}</p>
              </div>
            ))}

            <Button type="submit">
              Finalizar Pedido
            </Button>

          </Form>
        )}

      </Container>
    </Main>
  );
}