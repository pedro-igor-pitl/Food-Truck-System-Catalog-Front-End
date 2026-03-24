import styled from "styled-components";

export const Main = styled.main`
  position: fixed; /* ocupa a tela inteira */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffffff; /* cor de fundo escura */
  z-index: 100; /* garante que fique acima de outros elementos */
`;

export const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 35%;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, #fb6900ff, #facc15);
  border: none;
  color: #ffffffff;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background: linear-gradient(135deg, #facc1565, #fb690079);
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const ObrigatorioAsterisco = styled.span`
  color: red;
  margin-left: 4px;
`;

export const Input = styled.input`
  width: ${({ type }) => (type === "checkbox" ? "16px" : "100%")};
  height: ${({ type }) => (type === "checkbox" ? "16px" : "auto")};
  padding: ${({ type }) => (type === "checkbox" ? "0" : "10px 1px")};
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: linear-gradient(135deg, #f4ceb4ff, #fcefb9ff);
  color: #000000ff;
  cursor: ${({ type }) => (type === "checkbox" ? "pointer" : "text")};

  &::placeholder {
    color: #5454546b;
  }

  &:focus {
    outline: none;
    border-color: #111827;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px 1px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  resize: none;
  background: linear-gradient(135deg, #f4ceb4ff, #fcefb9ff);
  color: #000000ff;

  &::placeholder {
    color: #5454546b;
  }

  &:focus {
    outline: none;
    border-color: linear-gradient(135deg, #f4ceb4ff, #fcefb9ff);
  }
`;

export const AtivoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #fb6900ff, #facc15);
  color: #ffffff;
  padding: 10px 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const NomeProduto = styled.p `
  color: #000000;
`;

export const QuantidadeProduto = styled.p `
  color: #000000;
`;

export const PrecoProduto = styled.p `
  color: #000000;
`;

export const DivProdutoCarrinho = styled.div `
  
`;

export const DivPaiProdutosCarrinho = styled.div `
  max-height: 300px;
  overflow-y: scroll;
  padding-right: 5px;
`;
