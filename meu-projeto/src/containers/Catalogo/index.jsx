import React from "react";
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
    CartButton
} from "./style";

export default function App() {
  return (
    <Container>
      <Hero>
        <Navbar>
          <h1>Food Truck Delicias</h1>

          {/* Carrinho no canto superior direito */}
          <CartButton>
            🛒
          </CartButton>
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

        {/* HAMBÚRGUERES */}
        <Category>
          <h3>Hambúrgueres</h3>

          <CardGrid>
            <Card>
              <CardImage src="burger1.jpg" />
              <h4>X-Burger Clássico</h4>
              <p>Pão brioche, carne 150g, queijo e molho especial.</p>

              <PriceRow>
                <Price>R$ 19,90</Price>
                <Button>Adicionar</Button>
              </PriceRow>
            </Card>

            <Card>
              <CardImage src="burger2.jpg" />
              <h4>X-Bacon Delícia</h4>
              <p>Carne 150g, queijo, bacon e molho da casa.</p>

              <PriceRow>
                <Price>R$ 24,50</Price>
                <Button>Adicionar</Button>
              </PriceRow>
            </Card>
          </CardGrid>
        </Category>

        {/* BEBIDAS */}
        <Category>
          <h3>Bebidas</h3>

          <CardGrid>
            <Card>
              <CardImage src="coca.jpg" />
              <h4>Coca-Cola 350ml</h4>
              <p>Bebida gelada para acompanhar o lanche.</p>

              <PriceRow>
                <Price>R$ 6,00</Price>
                <Button>Adicionar</Button>
              </PriceRow>
            </Card>
          </CardGrid>
        </Category>

        {/* ACOMPANHAMENTOS */}
        <Category>
          <h3>Acompanhamentos</h3>

          <CardGrid>
            <Card>
              <CardImage src="batata.jpg" />
              <h4>Batata Frita Grande</h4>
              <p>Crocante e saborosa.</p>

              <PriceRow>
                <Price>R$ 12,00</Price>
                <Button>Adicionar</Button>
              </PriceRow>
            </Card>
          </CardGrid>
        </Category>
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