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
import {listaUsuarios} from "../../services/ListaUsuario.js";
import { alterarStatusUsuarioAdmin } from "../../services/alterarStatusUsuarioAdmin.js";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await listaUsuarios();  // aqui recebe o array de categorias
        setUsuarios(data);
        console.log("Usuarios carregados:", usuarios);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    }

    fetchUsuarios();
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

  const filteredUsuarios = usuarios.filter((usuarios) =>
    usuarios.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

      const handleAlterarStatusUsuario = async (id, ativo) => {
        console.log("Tentando alterar status do usuario com ID:", id);
        
        if (!window.confirm(`Tem certeza que deseja ${ativo ? 'desativar' : 'ativar'} este usuario?`)) return;

        try {
          const response = await alterarStatusProdutoAdmin(id);

          if (response.status === 204) {
            console.log("Usuario alterada com sucesso.");
            
            setUsuarios((prevUsuarios) =>
              prevUsuarios.map((usuario) =>
                
                usuario.id === id
                ? { ...usuario, ativo: ativo === "Sim" ? "Não" : "Sim" }
                : usuario
              )
            );
          } else {
            console.error('Erro inesperado ao alterar usuario:', response);
            alert("Erro inesperado ao alterar usuario.");
          }
        } catch (error) {
          console.error("Erro ao alterar usuario:", error);
          alert(`Erro ao alterar usuario: ${error.message}`);
        }
      };
  
  const handleAlterarUsuario = (id) => {
    navigate(`/dashboard/usuario/alterar/${id}`);
  };

  const handleNavigateToNewUser = () => {
    navigate("/dashboard/usuario/novo");
  };

  const handleCatalog = () => {
    navigate("/");
  }

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Gerenciar Usuarios</HeaderTitle>
          <HeaderSub>Organize os usuarios do seu cardápio</HeaderSub>

          <HeaderButtons>
            <Button onClick={handleCatalog}>Ver Catálogo</Button>
            <Button onClick={handleNavigateToNewUser}>Novo Usuario</Button>
          </HeaderButtons>

          <UserSection>
            <UserName>Administrador</UserName>
            <LogoutButton onClick={HandleLogout}>Sair</LogoutButton>
          </UserSection>

          <ButtonVoltar onClick={handleDashBoard}>Voltar</ButtonVoltar>

          <StatsGrid>
            <StatCard>
              <StatHeader>
                <span>Total de Usuarios</span>
              </StatHeader>
              <StatusValue>{usuarios.length}</StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  usuarios <GreenText>Ativos</GreenText>
                </span>
              </StatHeader>
              <StatusValue>
                <GreenText>
                  {usuarios.filter((p) => p.ativo === "Sim").length}
                </GreenText>
              </StatusValue>
            </StatCard>

            <StatCard>
              <StatHeader>
                <span>
                  usuarios <RedText>Inativos</RedText>
                </span>
              </StatHeader>
              <StatusValue>
                <RedText>
                  {usuarios.filter((p) => p.ativo !== "Sim").length}
                </RedText>
              </StatusValue>
            </StatCard>
          </StatsGrid>
        </HeaderInfo>

        <Body>
          <BodyCatalogHeader>
            <BodyTitle>Buscar Usuarios</BodyTitle>
            <BodyInput
              type="text"
              placeholder="Pesquisar por nome do Usuario..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </BodyCatalogHeader>

        <BodyCatalogList>
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((usuario, index) => {

              console.log("Objeto usuario:", usuario);

              return (
                <BodyCatalogItem
                  key={index}
                  ativo={usuario.ativo ? "ativo" : "inativo"}
                >
                  <BodyCatalogName>{usuario.nome}</BodyCatalogName>
                  <BodyCatalogDescProduto>
                    {usuario.descricao || "Sem descrição"}
                  </BodyCatalogDescProduto>

                  <BodyCatalogActions>
                    <IconButton
                      title="Editar"
                      onClick={() => handleAlterarUsuario(usuario.id)}
                    >
                      <FaEdit size={18} />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleAlterarStatusUsuario(usuario.id, usuario.ativo)
                      }
                      title="Alterar Status"
                    >
                      <FaSync size={18} />
                    </IconButton>
                  </BodyCatalogActions>
                </BodyCatalogItem>
              );
            })
          ) : (
            <p>Nenhum usuario encontrado.</p>
          )}
        </BodyCatalogList>

        </Body>
      </Header>
    </Container>
  );
}
