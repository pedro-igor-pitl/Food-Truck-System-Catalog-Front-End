import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Não está sendo usado, mas pode ser útil
import { 
    Body,
    Main, 
    BodyCards, 
    BodyCardProduto, 
    CardTitle, 
    CardDesc, 
    Form, 
    LabelNomeProduto, 
    InputNomeProduto, 
    LabelDescricao, 
    InputDescricao, 
    LabelPreco, 
    InputPreco, 
    LabelCategoria, 
    CampoObrigatorio, 
    DivImageUpload, 
    ImagemTitle,
    BodyCardPreview,
    Img,
    CardProductName,
    CardProductDesc,
    CardProductPrice,
    DivPaiPriceBtnCarrinho,
    ButtonAddCarrinho,
    HeaderTitle,
    HeaderDesc,
    ImagePreview,
    ButtonSubmitProduto,
    HeaderTitleDescPai,
    Header as StyledHeader,  // Renomeando a importação para evitar conflito
    Button as StyledButton,  // Renomeando Button, caso haja duplicação
} from "../NovoProdutoAdmin/styles.js";

import ImagemUpload from '../../assets/ImgUploadFile.png';
export default function NovoProdutoAdmin() {
    const [image, setImage] = useState(ImagemUpload);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState('');
    const [categorias, setCategorias]  = useState([
        { id: 1, nome: 'Lanches' },
        { id: 2, nome: 'Bebidas' },
        { id: 3, nome: 'Sobremesas' },
    ]);

    // Função para lidar com a seleção de uma nova imagem
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Quando a imagem for carregada, atualiza o estado com a URL
            reader.onloadend = () => {
                setImage(reader.result);
            }

            reader.readAsDataURL(file);
        }
    };

    // Função para voltar ao dashboard
    const VoltarDashBoard = () => {
        window.history.back();  // Usando 'window.history.back()' para voltar
    };

    return (
        <Body>
            <Main>
            <StyledHeader>  {/* Usando StyledHeader para evitar conflito */}
                <StyledButton onClick={VoltarDashBoard}>Voltar</StyledButton>  {/* Usando StyledButton */}
                <HeaderTitleDescPai>
                <HeaderTitle>Novo Produto</HeaderTitle>
                <HeaderDesc>Adicione um novo item ao seu cartápio</HeaderDesc>
                </HeaderTitleDescPai>
            </StyledHeader>
            
            <BodyCards>
                <BodyCardProduto>
                    <CardTitle>Informações do Produto</CardTitle>
                    <CardDesc>Preencha os dados do novo produto</CardDesc>
                    <Form>
                        <LabelNomeProduto>Nome do Produto <CampoObrigatorio>*</CampoObrigatorio></LabelNomeProduto>
                        <InputNomeProduto type="text" placeholder="Ex: X-Burger" />

                        <LabelDescricao>Descrição</LabelDescricao>
                        <InputDescricao type="text" placeholder="Ex: Pão, carne, queijo, alface e tomate" />

                        <LabelPreco>Preço <CampoObrigatorio>*</CampoObrigatorio></LabelPreco>
                        <InputPreco type="number" placeholder="0.00" />

                        <LabelCategoria>Categoria <CampoObrigatorio>*</CampoObrigatorio></LabelCategoria>
                        <select
                            value={selectedCategoriaId}
                            onChange={(e) => setSelectedCategoriaId(Number(e.target.value))} 
                        >
                            <option value="" disabled>
                                Selecione uma categoria
                            </option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}*/
                        </select>

                        <DivImageUpload>
                            <ImagemTitle>Escolha uma imagem</ImagemTitle>
                            <ImagePreview 
                                src={image} 
                                alt="Imagem de pré-visualização" 
                                onClick={() => document.getElementById('fileInput').click()} 
                            />
                            
                            <input 
                                type="file" 
                                id="fileInput" 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                        </DivImageUpload>
                        <ButtonSubmitProduto type="submit">Salvar Produto</ButtonSubmitProduto>
                    </Form>
                </BodyCardProduto>

                <BodyCardPreview>
                    <CardTitle>Pré-visualização</CardTitle>
                    <CardDesc>Veja como seu produto ficará no cardápio</CardDesc>

                    <Img src={image} alt="Preview do Produto" />
                    <CardProductName>Nome do Produto</CardProductName>
                    <CardProductDesc>Descrição do produto</CardProductDesc>
                    <DivPaiPriceBtnCarrinho>
                        <CardProductPrice>R$ 0.00</CardProductPrice>
                        <ButtonAddCarrinho>Adicionar ao Carrinho</ButtonAddCarrinho>
                    </DivPaiPriceBtnCarrinho>                    
                </BodyCardPreview>
            </BodyCards>
        </Main>
    </Body>
    );
};
