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
  const [showModal, setShowModal] = useState(false);
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

  const handleEditProduto = (produto) => {
    setProdutoEdit(produto);
    setNewProductName(produto.nome);
    setNewProductDesc(produto.descricao);
    setNewProductPrice(produto.preco);
    setShowModal(true); 
    setSelectedCategoriaId(produto.categoria?.id || "");

    const categoriaDoProduto = categorias.find(
      (cat) => cat.id === produto.categoria?.id
    );

    const nomeCategoria = categoriaDoProduto?.nome || "Categoria Desconhecida";
  };

  const handleSaveProductName = async () => {
    try {
      if (!newProductName.trim()) {
        alert("O nome do produto não pode estar vazio!");
        return;
      }

      const responseAtualizarProduto = await fetch(
        `http://localhost:8080/produto/atualizar/${produtoEdit.id}/${selectedCategoriaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...produtoEdit,
            nome: newProductName,
            descricao: newProductDesc,
            preco: parseFloat(newProductPrice), 
            categoria: { id: selectedCategoriaId },
          }),
        }
      );

      if (responseAtualizarProduto.ok) {
        const updatedProduto = await responseAtualizarProduto.json();

        const categoriaCompleta = categorias.find(cat => cat.id === selectedCategoriaId);


        updatedProduto.categoria = {
          id: selectedCategoriaId,
          nome: categoriaCompleta?.nome || "Categoria Desconhecida",
        };

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
      
  const handleNavigateToNewProduct = () => {
    navigate("/dashboard/produto/novo");
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Produtos</HeaderTitle>
          <HeaderSub>Organize os produtos do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button>Ver Catálogo</Button>
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
                      onClick={() => handleEditProduto(produto)}
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalLabel htmlFor="produto">Alteração de Produto:</ModalLabel>
            <ModalLabelItens>Nome:</ModalLabelItens>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <ModalLabelItens>Descrição:</ModalLabelItens>
            <input
              type="text"
              value={newProductDesc}
              onChange={(e) => setNewProductDesc(e.target.value)}
            />
            <ModalLabelItens>Preço:</ModalLabelItens>
            <input
              type="text"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <ModalLabelItens>Categoria:</ModalLabelItens>
            <select
              value={selectedCategoriaId}
              onChange={(e) => setSelectedCategoriaId(Number(e.target.value))} 
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
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
