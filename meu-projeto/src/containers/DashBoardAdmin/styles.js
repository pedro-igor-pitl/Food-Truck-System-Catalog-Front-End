import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 3rem;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
`;

export const Button = styled.button`
  padding: 0.75rem 1.25rem
  font-size: 0.95rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #fb6900ff, #facc15);
  color: #ffffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #9b5d00ff, #b3a400ff);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;


  @media(min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #ffffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 0.95rem;
`;

export const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

export const StatDesc = styled.p`
  font-size: 0.8rem;
  color: #9ca3af;
`;

export const ActionsGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(2 , 1fr);

  @media(max-width: 425px) {
    grid-template-columns: repeat(1 , 1fr);
  }

`;

export const ActionCard = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #ffffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);  
`;

export const ActionTitle = styled.h2`
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
`;

export const ActionDesc = styled.p`
  font-size: 0.825rem;
  color: #6b7280;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

export const ActionButtonPrimary = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #fb6900ff, #facc15);
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  font-size: 0.85rem;
  padding: 0.6rem;
  border-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #9b5d00ff, #b3a400ff);
  }
`;

export const ActionButtonSecondary = styled.button`
  background: linear-gradient(135deg, #facc15, #fb6900ff);
  font-size: 0.85rem;
  padding: 0.6rem;
  border-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #9b5d00ff, #b3a400ff);
  }
`;

export const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 1.25rem;
  border: 1px solid #e5e7eb;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

export const UserName = styled.p`
  font-weight: 600;
  color: #111827;
`;

export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #fb6900ff, #dc0000ff);
  color: white;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(135deg, #fa0000ff, #b60000ff);
  }
`;
