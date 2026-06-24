import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSync } from "react-icons/fa"; // Alterei de lixeira para sincronização
import { alterarStatusCategoria } from "../../services/alterarStatusCategoriaAdmin.js"; 
import { atualizarCategoria } from "../../services/alterarNomeCategoriaAdmin.js";  // Função que você forneceu

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
  ModaldivPai,
} from "./styles.js";

export default function ListaCategoriaAdmin() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Controlar a visibilidade do modal
  const [categoriaEdit, setCategoriaEdit] = useState(); // Controlar a categoria que será editada
  const [newCategoryName, setNewCategoryName] = useState(""); // Nome da categoria a ser alterado

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN CATEGORIA:", token);

        if (!token) {
          console.log("Usuário não logado");
          navigate("/");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/categoria/lista",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Categorias carregadas:", data);

        setCategorias(data);

      } catch (error) {
        console.error("Erro ao carregar categorias:", error);

        if (
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminName");
          navigate("/");
        }
      }
    }

    fetchCategorias();
  }, [navigate]);

const handleAlterarStatusCategoria = async (id, ativo) => {
  console.log("Tentando alterar status da categoria com ID:", id);
  
  // Confirmação do usuário
  if (!window.confirm(`Tem certeza que deseja ${ativo ? 'desativar' : 'ativar'} esta categoria?`)) return;

  try {
    const response = await alterarStatusCategoria(id);

    // Se o status for 204 (sem conteúdo), significa que a alteração foi bem-sucedida
    if (response.status === 204) {
      console.log("Categoria alterada com sucesso.");
      
      // Atualiza a categoria localmente sem precisar de dados adicionais
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === id ? { ...categoria, ativo: !ativo } : categoria
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

  // Função para abrir o modal de edição de categoria
  const handleEditCategory = (categoria) => {
    setCategoriaEdit(categoria); // Armazena a categoria que será editada
    setNewCategoryName(categoria.nome); // Preenche o campo de input com o nome atual
    setShowModal(true); // Mostra o modal
  };

const handleSaveCategoryName = async () => {
    try {
        // Verifique se o nome não está vazio
        if (!newCategoryName.trim()) {
            alert("O nome da categoria não pode estar vazio!");
            return;
        }

        // Atualizando o nome da categoria no backend
        const response = await atualizarCategoria(categoriaEdit.id, newCategoryName, categoriaEdit.ativo, categoriaEdit.descricao);

        if (response) {
            // Atualiza a categoria localmente
            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === categoriaEdit.id ? { ...categoria, nome: newCategoryName } : categoria
                )
            );
            setShowModal(false); // Fecha o modal após salvar
        } else {
            alert("Erro ao salvar o nome da categoria.");
        }
    } catch (error) {
        console.error("Erro ao salvar nome da categoria:", error);
        alert("Erro ao salvar nome da categoria.");
    }
};

  const handleCatalog = () => {
    navigate("/");
  }

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Categorias</HeaderTitle>
          <HeaderSub>Organize os produtos do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button onClick={handleCatalog}>Ver Catálogo</Button>
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
                <span>Total de Produtos</span>
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
                    <IconButton title="Editar" onClick={() => handleEditCategory(categoria)}>
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

      {/* Modal para editar categoria */}
      {showModal && (
        
        <ModalOverlay>
          
          <ModalContent>
            <ModalLabel htmlFor="categoria">Nova Categoria:</ModalLabel>
            <label>
              Novo nome da categoria:
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </label>
            <ModaldivPai>
              <ModalButton onClick={handleSaveCategoryName}>Salvar</ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>Cancelar</ModalButton>
            </ModaldivPai>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
