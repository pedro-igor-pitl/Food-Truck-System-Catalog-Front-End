import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listaProdutosCatalogo } from "../../services/ListaProdutoCatalogo.js";
import cardIcon from "../../assets/carrinhoCompras.png";
import {
  Container,
  Hero,
  Navbar,
  HeroContent,
  InfoList,
  MenuSection,
  Title,
  Subtitle,
  Category,
  CardGrid,
  Card,
  CardImage,
  PriceRow,
  Price,
  Button,
  Footer,
  FooterInfo,
  ContactButton,
  Copy,
  CartButton,
  CartIcon,
  overlayStyle,
  cartStyle,
  cartHeader,
  closeButton,
  QuantityControl,
  QuantityButton,
  QuantityText
} from "./style";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });
  const navigate = useNavigate();

  function addToCart(produto) {
    
    setCart(prevCart => {
      const itemExistente = prevCart.find(p => p.id === produto.id);

      if (itemExistente) {
        return prevCart.map(p =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }

      return [...prevCart, { ...produto, quantidade: 1 }];
    });

    setCartOpen(true); // abre automaticamente
  }


  useEffect(() => {
    async function carregarDados() {
      try {
        const data = await listaProdutosCatalogo();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      }
    }
    carregarDados();
  }, []);
  

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");

    if (carrinhoSalvo) {
      setCart(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const categorias = produtos.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const cartCategorias = cart.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    console.log(item);
    return acc;
  }, {});

  
  const handleNavigateVerificarUsuario = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    navigate("/verificar/usuario");
  };

  const RemoveItemCarrinho = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  const increaseItem = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const decreaseItem = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter(item => item.quantidade > 0) // remove se for 0
    );
  };

  return (
    <Container>
      <Hero>
        <Navbar>
          <h1>Food Truck Delicias</h1>

          <button style={CartButton} onClick={() => setCartOpen(true)}>
            <img src={cardIcon} alt="Carrinho" style={CartIcon} />
          </button>
        </Navbar>

        <HeroContent>
          <h2>Saborosos salgados que conquistarão seu paladar</h2>
          <InfoList>
            <li>Praça Central - Centro</li>
            <li>Seg-Sex: 18h às 23h</li>
            <li>(85) 99999-0000</li>
          </InfoList>
        </HeroContent>
      </Hero>

      <MenuSection>
        <Title>Nosso Cardápio</Title>
        <Subtitle>Descubra sabores únicos preparados com ingredientes frescos!</Subtitle>

          {Object.keys(categorias).map((categoria) => (
            <Category key={categoria}>
            <h3>{categoria}</h3>
            <CardGrid>
                {categorias[categoria].map((item) => (
                  <Card key={`${categoria}-${item.id}`}>
                  <CardImage src={item.imagemUrl} />
                  <h4>{item.produto}</h4>
                  <p>{item.descricao}</p>
                  <PriceRow>
                    <Price>R$ {item.preco.toFixed(2)}</Price>
                    <Button onClick={() => addToCart(item)}>
                      Adicionar
                    </Button>
                  </PriceRow>
                </Card>
              ))}
            </CardGrid>
          </Category>
        ))}
      </MenuSection>

      <Footer>
        <h3>Entre em Contato</h3>
        <FooterInfo>
          <div>
            <h4>Localização</h4>
            <p>Praça Central - Centro</p>
          </div>
          <div>
            <h4>Horários</h4>
            <p>Seg-Sex: 18h às 23h</p>
          </div>
          <div>
            <h4>Contato</h4>
            <p>(85) 99999-0000</p>
          </div>
        </FooterInfo>
        <ContactButton>Falar no WhatsApp</ContactButton>
        <Copy>© 2024 Food Truck Delicias - Todos os direitos reservados.</Copy>
      </Footer>

      {cartOpen && (
        <div style={overlayStyle}>
          <div style={cartStyle}>
            <div style={cartHeader}>
              <h3>Seu Carrinho</h3>
              <button onClick={() => setCartOpen(false)} style={closeButton}>
                X
              </button>
            </div>

            {cart.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              Object.keys(cartCategorias).map((categoria) => (
                <div key={categoria}>
                <h4 style={{ borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
                  {categoria}
                </h4>
                
                {cartCategorias[categoria].map(item => (
                  <div key={`${categoria}-${item.id}`}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <strong>{item.produto}</strong>
                      <button onClick={() => RemoveItemCarrinho(item.id)}>X</button>
                    </div>
                    <QuantityControl style={{display: "flex", justifyContent: "space-around", alignItems: "start"}}>
                      <QuantityText>Qtd: {item.quantidade}</QuantityText>
                      <QuantityButton  onClick={() => decreaseItem(item.id)}>-</QuantityButton>
                      <QuantityButton  onClick={() => increaseItem(item.id)}>+</QuantityButton>
                    </QuantityControl>
                    <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </div>
                ))}
                
              </div>
            ))

            )}

            {cart.length > 0 && (
              <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                Total: R${" "}
                {cart
                  .reduce((total, item) => total + item.preco * item.quantidade, 0)
                  .toFixed(2)}
              </div>
            )}
              <div style={{alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ marginTop: "20px", fontWeight: "bold"}}>
                  <button
                    onClick={handleNavigateVerificarUsuario}
                    disabled={cart.length === 0}
                    style={{
                      marginTop: "20px",
                      fontWeight: "bold",
                      opacity: cart.length === 0 ? 0.5 : 1,
                      cursor: cart.length === 0 ? "not-allowed" : "pointer"
                    }}
                  >
                    Finalizar
                  </button>
                </div>
              </div>
          </div>
        </div>
      )}

    </Container>
  );
}
