import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { listaPedidos } from "../../services/ListaPedidos.js";

import {
  Container,
  Header,
  HeaderInfo,
  HeaderTitle,
  HeaderSub,
  HeaderButtons,
  Button,
  UserSection,
  UserName,
  LogoutButton,
  StatsGrid,
  StatCard,
  StatHeader,
  StatusValue,
  ButtonVoltar,
  Body,
  BodyCatalogHeader,
  BodyTitle,
  BodyInput,
  BodyCatalogList,
  BodyCatalogItem,
  BodyCatalogName,
  BodyCatalogActions,
  IconButton,
  GreenText,
  ModalOverlay,
  ModalContent,
  ModalButton,
  ModalLabel
} from "./styles.js";

export default function ListaPedidos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    useEffect(() => {
    async function fetchPedidos() {
        try {
        const data = await listaPedidos();

        const pedidosUnicos = Object.values(
            data.reduce((acc, pedido) => {
            const chave = `${pedido.nomeUsuario}-${pedido.dataPedido}-${pedido.precoTotal}`;

            if (!acc[chave]) {
                acc[chave] = { ...pedido };
            } else {
                acc[chave].itens = [
                ...acc[chave].itens,
                ...pedido.itens
                ];
            }

            return acc;
            }, {})
        );

        setPedidos(pedidosUnicos);

        } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        }
    }

    fetchPedidos();
    }, []);

  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

    const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nomeUsuario?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Pedidos</HeaderTitle>
          <HeaderSub>Acompanhe os pedidos realizados</HeaderSub>

          <HeaderButtons>
            <Button onClick={() => navigate("/")}>Ver Catálogo</Button>
          </HeaderButtons>

          <UserSection>
            <UserName>Administrador</UserName>
            <LogoutButton onClick={HandleLogout}>Sair</LogoutButton>
          </UserSection>

          <ButtonVoltar onClick={() => navigate("/dashboard")}>
            Voltar
          </ButtonVoltar>

          <StatsGrid>
            <StatCard>
              <StatHeader>
                <span>Total de Pedidos</span>
              </StatHeader>
              <StatusValue>{pedidos.length}</StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>Total Faturado</span>
              </StatHeader>
              <StatusValue>
                <GreenText>
                  R$ {pedidos.reduce((acc, p) => acc + p.precoTotal, 0).toFixed(2)}
                </GreenText>
              </StatusValue>
            </StatCard>
          </StatsGrid>
        </HeaderInfo>

        <Body>
          <BodyCatalogHeader>
            <BodyTitle>Buscar Pedidos</BodyTitle>
            <BodyInput
              type="text"
              placeholder="Pesquisar por nome do cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </BodyCatalogHeader>

          <BodyCatalogList>
            {filteredPedidos.map((pedido, index) => (
                <BodyCatalogItem key={index}>
                <BodyCatalogName>{pedido.nomeUsuario}</BodyCatalogName>

                <p>💳 {pedido.formaPagamento}</p>
                <p>💰 R$ {pedido.precoTotal}</p>

                <BodyCatalogActions>
                    <IconButton onClick={() => setPedidoSelecionado(pedido)}>
                    <FaEye size={18} />
                    </IconButton>
                </BodyCatalogActions>
                </BodyCatalogItem>
            ))}
          </BodyCatalogList>
        </Body>
      </Header>

      {/* MODAL */}
      {pedidoSelecionado && (
        <ModalOverlay>
          <ModalContent>
            <h2>Detalhes do Pedido</h2>

            <ModalLabel>Cliente:</ModalLabel>
            <p>{pedidoSelecionado.nomeUsuario}</p>

            <ModalLabel>Telefone:</ModalLabel>
            <p>{pedidoSelecionado.telefoneUsuario}</p>

            <ModalLabel>Email:</ModalLabel>
            <p>{pedidoSelecionado.emailUsuario}</p>

            <ModalLabel>Endereço:</ModalLabel>
            <p>
              {pedidoSelecionado.endereco?.rua},{" "}
              {pedidoSelecionado.endereco?.numero}
            </p>
            <p>
              {pedidoSelecionado.endereco?.bairro} -{" "}
              {pedidoSelecionado.endereco?.cidade}
            </p>

            <ModalLabel>Itens:</ModalLabel>
            {pedidoSelecionado.itens.map((item, i) => (
              <div key={i}>
                <p>
                  {item.produto?.nome || item.produto} - {item.quantidade}x
                </p>
              </div>
            ))}

            <ModalLabel>Total:</ModalLabel>
            <p>R$ {pedidoSelecionado.precoTotal}</p>

            <ModalButton onClick={() => setPedidoSelecionado(null)}>
              Fechar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}