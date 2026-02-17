import styled from "styled-components";

export const VerificarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdf8e8; /* combinando com o Container do catálogo */
`;

export const VerificarCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
  width: 350px;

  h2 {
    margin-bottom: 20px;
  }
`;

export const VerificarInput = styled.input`
  width: 90%;
  padding: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const VerificarButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #d97706; /* seguindo o padrão do botão do catálogo */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #b45309;
  }
`;

export const ErroMensagem = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;