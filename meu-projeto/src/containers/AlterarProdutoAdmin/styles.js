import styled from "styled-components";

// Main container that covers the whole page
export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f3f4f6; /* Light background color */
  z-index: 100;
  box-sizing: border-box;
`;

export const BodyContainer  = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitleDescPai = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
`;

export const StyledButton = styled.button`
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BodyCards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: normal;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  gap: 20px; /* Adjusted gap between columns */
  box-sizing: border-box;
  flex-wrap: wrap; /* Ensure the layout wraps on smaller screens */
`;

export const BodyCardProduto = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 48%; /* Adjust width to fit in two columns */
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

export const BodyCardPreview = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 48%; /* Adjust width to fit in two columns */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

export const CardDesc = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LabelNomeProduto = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const InputNomeProduto = styled.input`
  padding: 10px 0px 20px 0px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #fb6900;
  }
`;

export const LabelDescricao = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const InputDescricao = styled.input`
  padding: 10px 0px 20px 0px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #fb6900;
  }
`;

export const LabelPreco = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const InputPreco = styled.input`
  padding: 10px 0px 20px 0px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #fb6900;
  }
`;

export const LabelCategoria = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const SelectCategoria = styled.select`
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 16px;
  color: #111827;
  &:focus {
    outline: none;
    border-color: #fb6900;
  }
`;

export const CampoObrigatorio = styled.span`
  color: red;
  margin-left: 4px;
`;

export const DivImageUpload = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImagemTitle = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #111827;
  text-align: center;
`;

export const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px dashed #ddd;
  margin-bottom: 16px;
  &:hover {
    border-color: #aaa;
  }
`;

export const ButtonSubmitProduto = styled.button`
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 16px;
  margin-top: 10px;
  width: 100%;
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const CardProductName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

export const CardProductDesc = styled.p`
  font-size: 14px;
  color: #777;
  text-align: center;
  margin-bottom: 16px;
`;

export const CardProductPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #1cb33aff;
  margin-bottom: 20px;
`;

export const DivPaiPriceBtnCarrinho = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
`;

export const ButtonAddCarrinho = styled.button`
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 5px;
`;

export const HeaderDesc = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-top: 0;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #fb6900, #facc15);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const body = styled.body`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
