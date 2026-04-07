import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GETUsuarioPorEmailRetorno } from "../../services/GETInfoUsuariosCompleto.js";
import { buscarCarrinho } from "../../services/carrinhoService";

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
  FullWidth,
  Field,
} from "./styles.js";

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
    formaPagamento: usuarioRecebido?.formaPagamento || "",
  });

  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await GETUsuarioPorEmailRetorno(usuario.email);

        const usuarioEncontrado = data?.[0];

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
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

  async function salvarPedidoBackend() {
    try {
      let total = 0;

      const itens = carrinho.map((item) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        return {
          produtoId: item.id,
          quantidade: item.quantidade,
          precoUnitario: item.preco,
        };
      });

      const pedido = {
        dataPedido: new Date().toISOString(),

        nomeUsuario: usuario.nome,
        telefoneUsuario: usuario.telefone,
        emailUsuario: usuario.email,

        endereco: {
          rua: usuario.rua,
          numero: usuario.numero,
          bairro: usuario.bairro,
          cidade: usuario.cidade,
          cep: usuario.cep.replace(/\D/g, ""),
          complemento: usuario.complemento,
          estado: usuario.estado,
        },

        formaPagamento: usuario.formaPagamento?.toUpperCase(),

        observacao: "",
        precoTotal: total,
        itens: itens,
      };

      const response = await fetch("http://localhost:8080/pedido/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (!response.ok) throw new Error();

      return true;
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar pedido!");
      return false;
    }
  }

  async function buscarEnderecoPorCEP(cep) {
    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) return;

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setUsuario((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }

  const enviarParaWhatsApp = async () => {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    const salvou = await salvarPedidoBackend();
    if (!salvou) return;

    let mensagem = `🛒 *Novo Pedido*\n\n`;

    mensagem += `👤 *Cliente:* ${usuario.nome}\n`;
    mensagem += `📧 *Email:* ${usuario.email}\n`;
    mensagem += `📞 *Telefone:* ${usuario.telefone}\n\n`;

    mensagem += `📍 *Endereço:*\n`;
    mensagem += `${usuario.rua}, ${usuario.numero}\n`;
    mensagem += `${usuario.bairro} - ${usuario.cidade}/${usuario.estado}\n`;
    mensagem += `CEP: ${usuario.cep}\n\n`;

    mensagem += `💳 *Pagamento:* ${usuario.formaPagamento}\n\n`;

    mensagem += `📦 *Itens:*\n`;

    let total = 0;

    carrinho.forEach((item) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      mensagem += `- ${item.produto} (x${item.quantidade}) - R$ ${subtotal.toFixed(
        2
      )}\n`;
    });

    mensagem += `\n💰 *Total:* R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${
      import.meta.env.VITE_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

    localStorage.removeItem("carrinho");
    setCarrinho([]);

    setTimeout(() => navigate("/"), 1000);
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
          <>
            {/* 🔹 FORMULÁRIO */}
            <Form>
              <Field>
                <Label>Nome *</Label>
                <Input
                  value={usuario.nome || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, nome: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Email *</Label>
                <Input
                  value={usuario.email || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, email: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Telefone *</Label>
                <Input
                  value={usuario.telefone || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, telefone: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>CEP *</Label>
                <Input
                  value={usuario.cep || ""}
                  onChange={(e) => {
                    const cep = e.target.value;

                    setUsuario({ ...usuario, cep });

                    if (cep.length >= 8) buscarEnderecoPorCEP(cep);
                  }}
                />
              </Field>

              <Field>
                <Label>Bairro *</Label>
                <Input
                  value={usuario.bairro || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, bairro: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Cidade *</Label>
                <Input
                  value={usuario.cidade || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, cidade: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Estado *</Label>
                <Input
                  value={usuario.estado || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, estado: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Rua *</Label>
                <Input
                  value={usuario.rua || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, rua: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Número *</Label>
                <Input
                  value={usuario.numero || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, numero: e.target.value })
                  }
                />
              </Field>
                  
                <Label>Complemento *</Label>
                <Input
                  value={usuario.complemento || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, complemento: e.target.value })
                  }
                />
                <Field>
                <Label>Forma de Pagamento *</Label>
                <select
                  value={usuario.formaPagamento || ""}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      formaPagamento: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="CARTAO_CREDITO">Cartão Crédito</option>
                  <option value="CARTAO_DEBITO">Cartão Débito</option>
                  <option value="PIX">Pix</option>
                  <option value="DINHEIRO">Dinheiro</option>
                </select>
                </Field>
            </Form>
                    
            {/* 🔹 CARRINHO FORA DO GRID */}
            <div style={{ marginTop: "25px" }}>
              <Label>Itens do Carrinho</Label>
                <hr />
              <DivPaiProdutosCarrinho>
                {carrinho.map((item) => (
                  <DivProdutoCarrinho key={item.id}>
                    <NomeProduto>{item.produto}</NomeProduto>
                    <QuantidadeProduto>
                      Quantidade: {item.quantidade}
                    </QuantidadeProduto>
                    <PrecoProduto>R$ {item.preco}</PrecoProduto>
                  </DivProdutoCarrinho>
                ))}
              </DivPaiProdutosCarrinho>
              <hr />
            </div>

            <FullWidth>
              <Button onClick={enviarParaWhatsApp}>
                Finalizar Pedido
              </Button>
            </FullWidth>
          </>
        )}
      </Container>
    </Main>
  );
}