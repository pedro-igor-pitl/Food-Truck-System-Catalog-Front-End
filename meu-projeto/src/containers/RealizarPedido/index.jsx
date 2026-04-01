import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GETUsuarioPorEmailRetorno } from "../../services/GETInfoUsuariosCompleto.js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const usuarioRecebido = location.state?.usuario;
  const emailDigitado = location.state?.email || "";

  const [usuario, setUsuario] = useState({
    nome: usuarioRecebido?.nome || "",
    email: usuarioRecebido?.email || emailDigitado,
    telefone: usuarioRecebido?.telefone || "",
    cep: usuarioRecebido?.cep || "",
    cidade: usuarioRecebido?.cidade || "",
    complemento: usuarioRecebido?.complemento || "",
    estado: usuarioRecebido?.estado || "",
    rua: usuarioRecebido?.rua || "",
    bairro: usuarioRecebido?.bairro || "",
    numero: usuarioRecebido?.numero || "",
  });

  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  useEffect( () => {
    async function fetchUsuarios() {
      try {
        const data = await GETUsuarioPorEmailRetorno(usuario.email);

        const usuariosNormalizados = data.map((u) => ({
          ...u,
          ativo: u.ativo === "Sim"
        }));

        const usuarioEncontrado = usuariosNormalizados[0];

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
        }

        console.log("Usuario retornado: ", data);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    }

    fetchUsuarios();
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

  const enviarParaWhatsApp = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER;

  let mensagem = `🛒 *Novo Pedido*%0A%0A`;

  mensagem += `👤 *Cliente:* ${usuario.nome}%0A`;
  mensagem += `📧 *Email:* ${usuario.email}%0A`;
  mensagem += `📞 *Telefone:* ${usuario.telefone}%0A%0A`;

  mensagem += `📍 *Endereço:*%0A`;
  mensagem += `${usuario.rua}, ${usuario.numero}%0A`;
  mensagem += `${usuario.bairro} - ${usuario.cidade}/${usuario.estado}%0A`;
  mensagem += `CEP: ${usuario.cep}%0A`;
  mensagem += `Complemento: ${usuario.complemento}%0A%0A`;

  mensagem += `📦 *Itens do Pedido:*%0A`;

  let total = 0;

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      mensagem += `- ${item.produto} (x${item.quantidade}) - R$ ${subtotal.toFixed(2)}%0A`;
    });

    mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(url, "_blank");

    localStorage.removeItem("carrinho");
    setCarrinho([]);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

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

            <Label>Cep *</Label>
            <Input
              value={usuario.cep || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cep: e.target.value })
              }
            />

            <Label>Bairro *</Label>
            <Input
              value={usuario.bairro || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, bairro: e.target.value })
              }
            />

            <Label>Cidade *</Label>
            <Input
              value={usuario.cidade || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cidade: e.target.value })
              }
            />

            <Label>Complemento *</Label>
            <Input
              value={usuario.complemento || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cidade: e.target.value })
              }
            />

            <Label>Numero *</Label>
            <Input
              value={usuario.numero || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cidade: e.target.value })
              }
            />


            <Label>Rua *</Label>
            <Input
              value={usuario.rua || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cidade: e.target.value })
              }
            />

            <Label>Estado *</Label>
            <Input
              value={usuario.estado || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, cidade: e.target.value })
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

            <Button type="button" onClick={enviarParaWhatsApp}>
              Finalizar Pedido
            </Button>

          </Form>
        )}
      </Container>
    </Main>
  );
}