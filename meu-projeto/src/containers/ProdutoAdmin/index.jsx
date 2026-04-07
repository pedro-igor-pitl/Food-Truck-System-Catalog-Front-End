const BASE_URL = "http://localhost:8080";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSync } from "react-icons/fa";
import { listaProdutos } from "../../services/ListaProduto.js";

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
  ModalOverlay,
  ModalContent,
  ModalButton,
  ModalLabel,
  BodyCatalogImg,
  ModaldivPais,
  DivPaiPriceName,
  BoyCatalogPrice,
  BodyCatalogDescProduto,
  BodyCatalogCategoriaName,
  ModalLabelItens,
} from "./styles.js";
import listaCategoriaAdmin from "../../services/ListaCategoriaAdmin.js";
import { alterarStatusProdutoAdmin } from "../../services/alterarStatusProdutoAdmin.js";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(""); 


  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await listaCategoriaAdmin();  // aqui recebe o array de categorias
        setCategorias(data);
        console.log("Categorias carregadas:", produtos);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    async function fetchProdutos() {
      try {
        const data = await listaProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchCategorias();
    fetchProdutos();
  }, []);


  const HandleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  const handleDashBoard = () => {
    navigate("/dashboard");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

      const handleAlterarStatusProduto = async (id, ativo) => {
        console.log("Tentando alterar status do produto com ID:", id);
        
        if (!window.confirm(`Tem certeza que deseja ${ativo ? 'desativar' : 'ativar'} este produto?`)) return;

        try {
          const response = await alterarStatusProdutoAdmin (id);

          if (response.status === 204) {
            console.log("Produto alterada com sucesso.");
            
            setProdutos((prevProdutos) =>
              prevProdutos.map((produto) =>
                produto.id === id ? { ...produto, ativo: !ativo } : produto
              )
            );
          } else {
            console.error('Erro inesperado ao alterar categoria:', response);
            alert("Erro inesperado ao alterar categoria.");
          }
        } catch (error) {
          console.error("Erro ao alterar categoria:", error);
          alert(`Erro ao alterar categoria: ${error.message}`);
        }
      };
  
  const handleAlterarProduto = (id) => {
    navigate(`/dashboard/produto/alterar/${id}`);
  };

  const handleNavigateToNewProduct = () => {
    navigate("/dashboard/produto/novo");
  };

  const handleCatalog = () => {
    navigate("/");
  }

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Produtos</HeaderTitle>
          <HeaderSub>Organize os produtos do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button onClick={handleCatalog}>Ver Catálogo</Button>
            <Button onClick={handleNavigateToNewProduct}>Novo Produto</Button>
          </HeaderButtons>

          <UserSection>
            <UserName>Administrador</UserName>
            <LogoutButton onClick={HandleLogout}>Sair</LogoutButton>
          </UserSection>

          <ButtonVoltar onClick={handleDashBoard}>Voltar</ButtonVoltar>

          <StatsGrid>
            <StatCard>
              <StatHeader>
                <span>Total de Produtos</span>
              </StatHeader>
              <StatusValue>{produtos.length}</StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  Produtos <GreenText>Ativos</GreenText>
                </span>
              </StatHeader>
              <StatusValue>
                <GreenText>{produtos.filter((p) => p.ativo).length}</GreenText>
              </StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  Produtos <RedText>Inativos</RedText>
                </span>
              </StatHeader>
              <StatusValue>
                <RedText>{produtos.filter((p) => !p.ativo).length}</RedText>
              </StatusValue>
            </StatCard>
          </StatsGrid>
        </HeaderInfo>

        <Body>
          <BodyCatalogHeader>
            <BodyTitle>Buscar Produtos</BodyTitle>
            <BodyInput
              type="text"
              placeholder="Pesquisar por nome do Produto..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </BodyCatalogHeader>

          <BodyCatalogList>
            {filteredProdutos.length > 0 ? (
              filteredProdutos.map((produto, index) => (
                <BodyCatalogItem
                  key={index}
                  ativo={produto.ativo ? "ativo" : "inativo"}
                >

                  <BodyCatalogImg 
                    src={`${BASE_URL}${produto.imagemUrl}`} 
                    alt={produto.nome} 
                  />
                  <BodyCatalogName>{produto.nome}</BodyCatalogName>
                  <BodyCatalogDescProduto>{produto.descricao}</BodyCatalogDescProduto>
                  <DivPaiPriceName>
                    <BoyCatalogPrice>R$ {produto.preco.toFixed(2)}</BoyCatalogPrice>
                    <BodyCatalogCategoriaName>
                      {
                        categorias.find((cat) => cat.id === produto.categoria?.id)?.nome || "Categoria Desconhecida"
                      }
                    </BodyCatalogCategoriaName>

                  </DivPaiPriceName>
                  <BodyCatalogActions>
                    <IconButton
                      title="Editar"
                      onClick={() => handleAlterarProduto(produto.id)}
                    >
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAlterarStatusProduto(produto.id, produto.ativo)}
                      title="Alterar Status"
                    >
                      <FaSync size={18} />
                    </IconButton>
                  </BodyCatalogActions>
                </BodyCatalogItem>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </BodyCatalogList>
        </Body>
      </Header>
    </Container>
  );
}
