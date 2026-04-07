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
    formaPagamento: usuarioRecebido?.formaPagamento || "",
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

  async function salvarPedidoBackend() {
    try {
      let total = 0;

      const itens = carrinho.map(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        return {
          produtoId: item.id, // ⚠️ TEM QUE SER ID DO PRODUTO
          quantidade: item.quantidade,
          precoUnitario: item.preco
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
          estado: usuario.estado
        },

        formaPagamento: usuario.formaPagamento.toUpperCase(), // ⚠️ IMPORTANTE (ENUM)

        observacao: "",

        precoTotal: total,

        itens: itens
      };

      const response = await fetch("http://localhost:8080/pedido/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar pedido");
      }

      const data = await response.json();
      console.log("Pedido salvo:", data);

      return true;

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar pedido no sistema!");
      return false;
    }
  }

  async function buscarEnderecoPorCEP(cep) {
    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) return;

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
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
        estado: data.uf || "" // ✅ aqui resolve teu problema do VARCHAR(2)
      }));

    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }
  
  const enviarParaWhatsApp = async () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio!");
      return;
    }

    if (!usuario.nome || usuario.nome.trim() === "") {
      alert("Preencha o nome!");
      return;
    }

    if (!usuario.email || usuario.email.trim() === "") {
      alert("Preencha o email!");
      return;
    }

    if (!usuario.telefone || usuario.telefone.trim() === "") {
      alert("Preencha o telefone!");
      return;
    }

    if (!usuario.rua || usuario.rua.trim() === "") {
      alert("Preencha a rua!");
      return;
    }

    if (!usuario.numero || usuario.numero.trim() === "") {
      alert("Preencha o número!");
      return;
    }

    if (!usuario.bairro || usuario.bairro.trim() === "") {
      alert("Preencha o bairro!");
      return;
    }

    if (!usuario.cidade || usuario.cidade.trim() === "") {
      alert("Preencha a cidade!");
      return;
    }

    if (!usuario.estado || usuario.estado.trim() === "") {
      alert("Preencha o estado!");
      return;
    }

    if (!usuario.cep || usuario.cep.trim() === "") {
      alert("Preencha o CEP!");
      return;
    }

    if (!usuario.formaPagamento) {
      alert("Selecione a forma de pagamento!");
      return;
    }

    // ✅ SALVA PRIMEIRO
    const salvou = await salvarPedidoBackend();

    if (!salvou) return;

    const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER;

    let mensagem = `🛒 *Novo Pedido*\n\n`;

    mensagem += `👤 *Cliente:* ${usuario.nome}\n`;
    mensagem += `📧 *Email:* ${usuario.email}\n`;
    mensagem += `📞 *Telefone:* ${usuario.telefone}\n\n`;

    mensagem += `📍 *Endereço:*\n`;
    mensagem += `${usuario.rua}, ${usuario.numero}\n`;
    mensagem += `${usuario.bairro} - ${usuario.cidade}/${usuario.estado}\n`;
    mensagem += `CEP: ${usuario.cep}\n`;
    mensagem += `Complemento: ${usuario.complemento}\n\n`;

    mensagem += `💳 *Forma de Pagamento:* ${usuario.formaPagamento}\n\n`;

    mensagem += `📦 *Itens do Pedido:*\n`;

    let total = 0;

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      mensagem += `- ${item.produto} (x${item.quantidade}) - R$ ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\n💰 *Total:* R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

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
              onChange={(e) => {
                const cep = e.target.value;

                setUsuario({ ...usuario, cep });

                if (cep.length === 8 || cep.length === 9) {
                  buscarEnderecoPorCEP(cep);
                }
              }}
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
                setUsuario({ ...usuario, complemento: e.target.value })
              }
            />

            <Label>Numero *</Label>
            <Input
              value={usuario.numero || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, numero: e.target.value })
              }
            />


            <Label>Rua *</Label>
            <Input
              value={usuario.rua || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, rua: e.target.value })
              }
            />

            <Label>Estado *</Label>
            <Input
              value={usuario.estado || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, estado: e.target.value })
              }
            />

            <Label>Forma de Pagamento *</Label>
            <select
              value={usuario.formaPagamento || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, formaPagamento: e.target.value })
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "10px"
              }}
            >
              <option value="">Selecione</option>
              <option value="CARTAO_CREDITO">Cartão de Crédito</option>
              <option value="CARTAO_DEBITO">Cartão de Débito</option>
              <option value="PIX">Pix</option>
              <option value="DINHEIRO">Dinheiro</option>
            </select>

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