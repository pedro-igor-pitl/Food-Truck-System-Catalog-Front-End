import styled from "styled-components";

export const Container = styled.div`
  background: #fdf8e8;
  color: #333;
  font-family: Arial, sans-serif;
  width: 100%;
`;

export const Hero = styled.header`
  background: linear-gradient(180deg, #d97706, #fbbf24);
  color: white;
  padding: 50px 0;
  text-align: center;
`;

export const Navbar = styled.nav`
  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
  }
`;

export const HeroContent = styled.div`
  margin-top: 10px;

  h2 {
    font-size: 20px;
    font-weight: 300;
  }
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;

  li {
    display: inline-block;
    margin: 0 10px;
    font-size: 14px;
  }
`;

export const MenuSection = styled.section`
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 28px;
`;

export const Subtitle = styled.p`
  text-align: center;
  font-size: 15px;
  margin-bottom: 30px;
`;

export const Category = styled.div`
  margin-top: 40px;

  h3 {
    font-size: 22px;
    border-left: 6px solid #d97706;
    padding-left: 10px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 10px 0 5px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 180px;        // 🔥 altura fixa
  object-fit: cover;    // 🔥 corta sem distorcer
  border-radius: 10px;
`;

export const PriceRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.span`
  color: #16a34a;
  font-size: 18px;
  font-weight: bold;
`;

export const Button = styled.button`
  background: #d97706;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #b45309;
  }
`;

export const Footer = styled.footer`
  background: linear-gradient(180deg, #d97706, #f59e0b);
  padding: 40px 20px;
  text-align: center;
  color: white;
`;

export const FooterInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
  flex-wrap: wrap;

  h4 {
    margin-bottom: 5px;
  }
`;

export const CartButton = {
  position: "fixed",
  right: "20px",
  top: "20px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "none",
  background: "#f39c12",
  cursor: "pointer",
  boxShadow: "0 0 8px rgba(255, 255, 255, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
};

export const CartIcon = {
  width: "24px",
  height: "24px",
};

export const ContactButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 20px;
`;

export const Copy = styled.p`
  margin-top: 30px;
  font-size: 14px;
  opacity: 0.7;
`;

export const overlayStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 1000
};

export const cartStyle = {
  background: "#fff",
  width: "400px",
  maxHeight: "100vh",
  overflowY: "auto",
  padding: "20px",
  borderRadius: "8px"
};

export const cartHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

export const closeButton = {
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "black",
  backgroundColor: "gray",
  borderRadius: "50px"
};

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #f59e0b;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    background: #d97706;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const QuantityText = styled.span`
  font-size: 14px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
`;