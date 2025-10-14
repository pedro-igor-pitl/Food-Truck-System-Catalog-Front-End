import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSync } from "react-icons/fa";

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
  ModaldivPais,
  DivPaiPriceName,
  BoyCatalogPrice,
  BodyCatalogDescProduto,
  BodyCatalogCategoriaName,
} from "./styles.js";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const responseListaProduto = await fetch("http://localhost:8080/produto/lista");
        const data = await responseListaProduto.json();
        console.log("Produtos carregados:", data);
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
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

  const handleNewProduct = () => {
    navigate("/dashboard/produto");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduto = (produto) => {
    setProdutoEdit(produto);
    setNewProductName(produto.nome);
    setShowModal(true);
  };

  const handleSaveProductName = async () => {
    try {
            if (!newProductName.trim()) {
        alert("O nome do produto não pode estar vazio!");
        return;
      } 

      const responseAtualizarProduto = await fetch(`http://localhost:8080/produto/atualizar/${produtoEdit.id}/${produtoEdit.categoria.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...produtoEdit,
          nome: newProductName
        })
      });
    } catch (error) {
      console.log(error)
    }
  }

    const responseAlterarStatusCategoria = async (id) => {
      try {
        if (responseAtualizarProduto.ok) {
        const updatedProduto = await responseAtualizarProduto.json();

        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produto.id === updatedProduto.id ? updatedProduto : produto
          )
        );

        setShowModal(false);
      } else {
        alert("Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao salvar nome do produto.");
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Produtos</HeaderTitle>
          <HeaderSub>Organize os produtos do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button>Ver Catálogo</Button>
            <Button onClick={handleNewProduct}>Novo Produto</Button>
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
                <BodyCatalogItem key={index} ativo={produto.ativo ? "ativo" : "inativo"}>
                  <BodyCatalogName>{produto.nome}</BodyCatalogName>
                  <BodyCatalogDescProduto>{produto.descricao}</BodyCatalogDescProduto>
                  <DivPaiPriceName>
                  <BoyCatalogPrice>R$ {produto.preco.toFixed(2)}</BoyCatalogPrice>
                  <BodyCatalogCategoriaName>{produto.categoria.nome}</BodyCatalogCategoriaName>
                  </DivPaiPriceName>
                  <BodyCatalogActions>
                    <IconButton title="Editar" onClick={() => handleEditProduto(produto)}>
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => alert("Implementar alteração de status")}
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalLabel htmlFor="produto">Novo Nome do Produto:</ModalLabel>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <ModaldivPais>
              <ModalButton onClick={handleSaveProductName}>Salvar</ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>Cancelar</ModalButton>
            </ModaldivPais>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}