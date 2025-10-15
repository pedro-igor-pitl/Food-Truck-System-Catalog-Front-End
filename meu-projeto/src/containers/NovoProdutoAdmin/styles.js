import styled from "styled-components";

// Main container that covers the whole page
export const Main = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: block;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6; /* Light background color */
  z-index: 100;
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

export const HeaderTitleDescPai = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
`;

// Body Cards wrapper
export const BodyCards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
`;

// Container for the Product Form
export const BodyCardProduto = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

// Title of the product form
export const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

// Description under the card title
export const CardDesc = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
`;

// Form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Label for input fields
export const LabelNomeProduto = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

// Input field for product name
export const InputNomeProduto = styled.input`
  padding: 12px 15px;
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

// Label for description field
export const LabelDescricao = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

// Input field for product description
export const InputDescricao = styled.input`
  padding: 12px 15px;
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

// Label for price field
export const LabelPreco = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

// Input field for price
export const InputPreco = styled.input`
  padding: 12px 15px;
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

// Label for category field
export const LabelCategoria = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

// Red asterisk indicating required fields
export const CampoObrigatorio = styled.span`
  color: red;
  margin-left: 4px;
`;

// Dropdown for selecting category
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

// Container for the image upload section
export const DivImageUpload = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Label for the image upload section
export const ImagemTitle = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #111827;
  text-align: center;
`;

export const Body = styled.body`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: block;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6; /* Light background color */
    z-index: 100;
`;

// Preview of the uploaded image (clickable)
export const ImagePreview = styled.img`
  width: 500px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px dashed #ddd;
  margin-bottom: 16px;
  margin-top: 10px;
  
  &:hover {
    border-color: #aaa;
  }
`;

// Container for product preview card
export const BodyCardPreview = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Image preview of the product
export const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

// Product name in preview card
export const CardProductName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

// Product description in preview card
export const CardProductDesc = styled.p`
  font-size: 14px;
  color: #777;
  text-align: center;
  margin-bottom: 16px;
`;

// Price display for the product in preview card
export const CardProductPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #fb6900;
  margin-bottom: 20px;
`;

// Wrapper for price and button in preview
export const DivPaiPriceBtnCarrinho = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
    max-width: 300px;
    margin-top: 10px;
`;

// Button for adding product to cart
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

// Header title (for the page)
export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 5px;
`;

// Header description (subtitle)
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