import React, { useEffect, useState } from "react";
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
  CartIcon
} from "./style";

export default function App() {
  const [produtos, setProdutos] = useState([]);

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

  const categorias = produtos.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  return (
    <Container>
      <Hero>
        <Navbar>
          <h1>Food Truck Delicias</h1>

          <button style={CartButton}>
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

        {Object.keys(categorias).map((categoria, index) => (
          <Category key={index}>
            <h3>{categoria}</h3>
            <CardGrid>
              {categorias[categoria].map((item, i) => (
                <Card key={i}>
                  <CardImage src={item.imagemUrl} />
                  <h4>{item.produto}</h4>
                  <p>{item.descricao}</p>
                  <PriceRow>
                    <Price>R$ {item.preco.toFixed(2)}</Price>
                    <Button>Adicionar</Button>
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
    </Container>
  );
}
