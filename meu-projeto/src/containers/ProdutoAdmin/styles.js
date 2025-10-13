import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;  /* centraliza horizontalmente */
  align-items: center;      /* centraliza verticalmente */
  background-color: #f9fafb;
`;

export const Header = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;       /* limita o tamanho para telas grandes */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);

  @media(min-width: 768px) {
    flex-direction: column;  /* ou row se quiser os botões ao lado do título */
  }
`;


export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
`;

export const HeaderSub = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media(min-width: 768px) {
    margin-top: 0;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #9b5d00, #b3a400);
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: right;

  @media(min-width: 768px) {
    margin-top: 0;
  }
`;

export const ButtonVoltar = styled.div`
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    background: white;
    color: #000000ff;
    border-radius: 0.75rem;
    display: flex;
    border: 2px solid #000000ff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    width: fit-content;
    margin-top: 1rem;
    justify-content: center;

    &: hover {
        background: #000000ff;
        color: #ffffffff;
        border: 2px solid #000000ff;
    }
`;

export const UserName = styled.p`
  font-weight: 600;
  color: #111827;
`;

export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #fb6900, #dc0000);
  color: white;
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(135deg, #fa0000, #b60000);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media(min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 0.95rem;
`;

export const StatusValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media(min-width: 768px) {
    flex: 1; /* ocupa o espaço disponível */
  }
`;

// Corpo rolável das categorias
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

// Header da lista de categorias com título e campo de pesquisa
export const BodyCatalogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
`;

export const BodyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const BodyInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background: #fafafaff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  color: #111827;
  flex: 1;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #000000ff;
  }
`;

export const IconButton = styled.button`
  background: ${(props) =>
    props.deletebtn ? "#fee2e2" : "#e0f2fe"}; /* vermelho claro ou azul claro */
  color: ${(props) =>
    props.deletebtn ? "#dc2626" : "#2563eb"}; /* vermelho ou azul */
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) =>
      props.deletebtn ? "#dc2626" : "#2563eb"};
    color: #fff;
    transform: scale(1.05);
  }
`;


export const GreenText = styled.span`
  color: #10b981;
  font-weight: 700
  `;

export const RedText = styled.span`
  color: #ef4444;
  font-weight: 700
  `;
// Lista de categorias
export const BodyCatalogList = styled.div`
  display: grid;
  flex-direction: ;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
  padding: 1rem;
  height: auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(50px, auto);
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-top: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a1a1aa;
  }

`;

export const BodyCatalogCategoriaName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffffff;
  border: 1px solid #10b981;
  background: #000000ff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
`;

export const BodyCatalogItem = styled.div`
  background: ${(props) => (props.ativo === "ativo" ? "linear-gradient(135deg, #ffffffff, #ecf8f3ff, #04ffa3ff)" : "linear-gradient(135deg, #ffffffff, #f8ececff, #fe9b9bff)")};
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1rem 1.25rem;
  display: block;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;
  gap: 0.5rem;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

export const BodyCatalogName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
`;

export const BodyCatalogActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const BodyEditButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  background: #2563eb;
  
  color: #ffffff;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

export const BodyDeleteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  background: #ef4444;
  background: linear-gradient(135deg, #fb6900, #facc15)
  color: #ffffff;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dc2626;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Garante que o modal fique acima de outros elementos */
`;

export const ModalContent = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ModaldivPais = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ModalLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #9b5d00, #b3a400);
  }

  & + & {
    margin-left: 1rem; /* Espaço entre os botões */
  }
`;

export const ModalInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background: #fafafaff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  color: #111827;

  &:focus {
    outline: none;
    border-color: #000000ff;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

export const DivPaiPriceName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const BoyCatalogPrice = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #10b981;
`;

export const BodyCatalogDescProduto = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
  margin-top: 4px;
`;