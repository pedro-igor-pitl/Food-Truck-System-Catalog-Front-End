import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSync } from "react-icons/fa"; // Alterei de lixeira para sincronização
import { alterarStatusCategoria } from "../../services/alterarStatusCategoriaAdmin.js"; 
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
  RedText,
  GreenText,
} from "./styles.js";

export default function ListaCategoriaAdmin() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:8080/categoria/lista");
        const data = await response.json();
        console.log("Categorias carregadas:", data);
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    fetchCategorias();
  }, []);

  const handleAlterarStatusCategoria = async (id, ativo) => {
    console.log("Tentando alterar status da categoria com ID:", id);
    if (!window.confirm(`Tem certeza que deseja ${ativo ? 'desativar' : 'ativar'} esta categoria?`)) return;

    try {
      await alterarStatusCategoria(id);
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === id ? { ...categoria, ativo: !ativo } : categoria
        )
      );
    } catch (error) {
      console.error("Erro ao alterar categoria:", error);
      alert("Erro ao alterar categoria");
    }
  };

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}  
              onChange={handleSearchChange}  
            />
          </BodyCatalogHeader>

          <BodyCatalogList>
            {filteredCategorias.length > 0 ? (
              filteredCategorias.map((categoria, index) => (
                <BodyCatalogItem key={index} ativo={categoria.ativo ? "ativo" : "inativo"}>
                  <BodyCatalogName>{categoria.nome}</BodyCatalogName>
                  <BodyCatalogActions>
                    <IconButton title="Editar">
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAlterarStatusCategoria(categoria.id, categoria.ativo)}
                      title="Alterar Status"
                    >
                      <FaSync size={18} />
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
