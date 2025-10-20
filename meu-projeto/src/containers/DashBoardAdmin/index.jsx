import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaTags, FaUsers, FaShoppingCart } from "react-icons/fa";

import {
  Container,
  Header,
  HeaderInfo,
  HeaderTitle,
  HeaderSub,
  HeaderButtons,
  Button,
  StatsGrid,
  StatCard,
  StatHeader,
  StatValue,
  StatDesc,
  ActionsGrid,
  ActionCard,
  ActionTitle,
  ActionDesc,
  ActionButtons,
  ActionButtonPrimary,
  ActionButtonSecondary,
  UserSection,
  UserName,
  LogoutButton,
} from "./styles.js";

import { fetchTotalizadores } from "../../services/DashBoardAdmin.js";

export default function DashBoardAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalCategorias: 0,
    totalClientes: 0,
    totalPedidos: 0,
  });

  const userName = localStorage.getItem("adminName") || "Administrador";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  const handleNewCategory = () => {
    navigate("/categoria");
  }
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetchTotalizadores(token)
      .then((data) => setStats(data))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  const handleDashboardProduto = () => {
    navigate("/dashboard/produto");
  };
  
  const handleDashBoardCatalogo = () => {
    navigate("/dashboard/categoria");
  };

  const handleDashBoardUsuario = () => {
    navigate("/dashboard/usuario");
  };
  
  const handleNovoProduto = () => {
    navigate("/dashboard/produto/novo");
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Painel Administrativo</HeaderTitle>
          <HeaderSub>Gerencie seu food truck de forma eficiente</HeaderSub>
        </HeaderInfo>

        <HeaderButtons>
          <Button>Ver Catálogo</Button>
          <Button onClick={handleNovoProduto}>Novo Produto</Button>
          <Button onClick={handleNewCategory}>Nova Categoria</Button>
        </HeaderButtons>

        <UserSection>
          <UserName>{userName}</UserName>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </UserSection>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <span>Total de Produtos</span>
            <FaBox />
          </StatHeader>
          <StatValue>{stats.totalProdutos}</StatValue>
          <StatDesc>Ativos</StatDesc>
        </StatCard>

        <StatCard>
          <StatHeader>
            <span>Categorias</span>
            <FaTags />
          </StatHeader>
          <StatValue>{stats.totalCategorias}</StatValue>
          <StatDesc>Organizando o cardápio</StatDesc>
        </StatCard>

        <StatCard>
          <StatHeader>
            <span>Usuarios</span>
            <FaUsers />
          </StatHeader>
          <StatValue>{stats.totalClientes}</StatValue>
          <StatDesc>Cadastrados no sistema</StatDesc>
        </StatCard>

        <StatCard>
          <StatHeader>
            <span>Pedidos</span>
            <FaShoppingCart />
          </StatHeader>
          <StatValue>{stats.totalPedidos}</StatValue>
          <StatDesc>Processados</StatDesc>
        </StatCard>
      </StatsGrid>

      <ActionsGrid>
        <ActionCard>
          <ActionTitle>Gerenciar Produtos</ActionTitle>
          <ActionDesc>Adicione, edite e organize os produtos do seu cardápio</ActionDesc>
          <ActionButtons>
            <ActionButtonPrimary onClick={handleDashboardProduto}>Ver Produtos</ActionButtonPrimary>
          </ActionButtons>
        </ActionCard>

        <ActionCard>
          <ActionTitle>Gerenciar Categorias</ActionTitle>
          <ActionDesc>Organize seus produtos em categorias para facilitar a navegação</ActionDesc>
          <ActionButtons>
            <ActionButtonPrimary onClick={handleDashBoardCatalogo}>Ver Categorias</ActionButtonPrimary>
          </ActionButtons>
        </ActionCard>

        <ActionCard>
          <ActionTitle>Gerenciar Usuarios</ActionTitle>
          <ActionDesc>Visualize os usuarios do seu negocio</ActionDesc>
          <ActionButtons>
            <ActionButtonPrimary onClick={handleDashBoardUsuario}>Ver Usuarios</ActionButtonPrimary>
          </ActionButtons>
        </ActionCard>

        <ActionCard>
          <ActionTitle>Gerenciar Pedidos</ActionTitle>
          <ActionDesc>Visualize os usuarios do seu negocio</ActionDesc>
          <ActionButtons>
            <ActionButtonPrimary>Ver Usuarios</ActionButtonPrimary>
          </ActionButtons>
        </ActionCard>
      </ActionsGrid>
    </Container>
  );
}