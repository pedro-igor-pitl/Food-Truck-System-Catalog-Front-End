import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // ✅ Import dos ícones
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
  IconButton, // novo estilo
  RedText,
  GreenText,
} from "./styles.js";

export default function ListaCategoriaAdmin() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:8080/categoria/lista");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    fetchCategorias();
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  const handleDashBoard = () => {
    navigate("/dashboard");
  };

  const handleNewCategory = () => {
    navigate("/categoria");
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Categorias</HeaderTitle>
          <HeaderSub>Organize os produtos do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button>Ver Catálogo</Button>
            <Button>Novo Produto</Button>
            <Button onClick={handleNewCategory}>Nova Categoria</Button>
          </HeaderButtons>

          <UserSection>
            <UserName>Administrador</UserName>
            <LogoutButton onClick={HandleLogout}>Sair</LogoutButton>
          </UserSection>

          <ButtonVoltar onClick={handleDashBoard}>Voltar</ButtonVoltar>

          <StatsGrid>
            <StatCard>
              <StatHeader>
                <span>Total de Categorias</span>
              </StatHeader>
              <StatusValue>{categorias.length}</StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  Categorias <GreenText>Ativas</GreenText>
                </span>
              </StatHeader>
              <StatusValue>
                <GreenText>{categorias.filter((c) => c.ativo).length}</GreenText>
              </StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  Categorias <RedText>Inativas</RedText>
                </span>
              </StatHeader>
              <StatusValue>
                <RedText>{categorias.filter((c) => !c.ativo).length}</RedText>
              </StatusValue>
            </StatCard>
          </StatsGrid>
        </HeaderInfo>

        <Body>
          <BodyCatalogHeader>
            <BodyTitle>Buscar Categorias</BodyTitle>
            <BodyInput
              type="text"
              placeholder="Pesquisar por nome da categoria..."
            />
          </BodyCatalogHeader>

          <BodyCatalogList>
            {categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <BodyCatalogItem key={index}>
                  <BodyCatalogName>{categoria.nome}</BodyCatalogName>
                  <BodyCatalogActions>
                    <IconButton title="Editar">
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton title="Excluir" deletebtn="true">
                      <FaTrash size={18} />
                    </IconButton>
                  </BodyCatalogActions>
                </BodyCatalogItem>
              ))
            ) : (
              <p>Nenhuma categoria encontrada.</p>
            )}
          </BodyCatalogList>
        </Body>
      </Header>
    </Container>
  );
}
