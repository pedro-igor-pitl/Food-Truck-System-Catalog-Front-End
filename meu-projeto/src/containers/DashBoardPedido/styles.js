import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
`;

export const Header = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
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
`;

export const Button = styled.button`
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  transition: 0.2s;

  &:hover {
    background: linear-gradient(135deg, #9b5d00, #b3a400);
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: right;
`;

export const ButtonVoltar = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  background: white;
  border-radius: 0.75rem;
  border: 2px solid #000;
  cursor: pointer;
  width: fit-content;
  color: black;
  margin-top: 1rem;

  &:hover {
    background: #000;
    color: #fff;
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
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #fa0000, #b60000);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media(min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div`
  background: #fff;
  border-radius: 1.25rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

export const StatHeader = styled.div`
  color: #6b7280;
`;

export const StatusValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const BodyCatalogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const BodyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
`;

export const BodyInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const BodyCatalogList = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const BodyCatalogItem = styled.div`
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  color: black;
`;

export const BodyCatalogName = styled.span`
  font-weight: 600;
`;

export const BodyCatalogActions = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  background: #e0f2fe;
  color: #2563eb;
  border-radius: 0.5rem;
  padding: 0.4rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2563eb;
    color: #fff;
  }
`;

export const GreenText = styled.span`
  color: #10b981;
  font-weight: 700;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  color: black;
`;

export const ModalLabel = styled.label`
  font-weight: 600;
  color: black;
`;

export const ModalButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem;
  background: linear-gradient(135deg, #fb6900, #facc15);
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
`;