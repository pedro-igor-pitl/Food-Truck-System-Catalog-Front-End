import React, { useState, useEffect } from "react";

import { 
    BodyContainer,
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
    Header as StyledHeader, 
    Button as StyledButton,
} from "../NovoProdutoAdmin/styles.js";

import ImagemUpload from '../../assets/ImgUploadFile.png';
import { cadastrarProduto } from '../../services/NovoProdutoAdmin.js';
import listaCategoriaAdmin from '../../services/ListaCategoriaAdmin.js';

export default function NovoProdutoAdmin() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
    const [ativoProduto, setAtivoProduto] = useState(true); 
    const [image, setImage] = useState(null);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState('');
    const [categorias, setCategorias]  = useState([]);
    const textPreviewNomeProduto = 'Nome do Produto';
    const textPreviewDescricaoProduto = 'Descrição do produto';
    const textPreviewPrecoProduto = '0.00';

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
    }
    };

    const handlePrecoChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d{0,2}$/;

        if (value === '' || regex.test(value)) {
            setPrecoProduto(value);
        }
    }
    const VoltarDashBoard = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchCategorias = async () => {
        try {
            const data = await listaCategoriaAdmin(); 
            setCategorias(data);
        } catch (error) {
            console.error("Erro ao carregar categorias", error);
        }
        };

        fetchCategorias();
    }, []); 

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nomeProduto);
    formData.append('descricao', descricaoProduto);
    formData.append('preco', precoProduto);
    formData.append('ativo', ativoProduto);
    formData.append('categoriaId', selectedCategoriaId);
    formData.append('imagem', image);

    try {
        await cadastrarProduto(formData, selectedCategoriaId);
        alert("Produto cadastrado com sucesso!");
        
        setNomeProduto('');
        setDescricaoProduto('');
        setPrecoProduto('');
        setImage(null);
        setSelectedCategoriaId('');
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto. Tente novamente.");
    }
    };

    return (
    <BodyContainer>
        <Main>
            <StyledHeader>  
                <StyledButton onClick={VoltarDashBoard}>Voltar</StyledButton>  
                <HeaderTitleDescPai>
                <HeaderTitle>Novo Produto</HeaderTitle>
                <HeaderDesc>Adicione um novo item ao seu cartápio</HeaderDesc>
                </HeaderTitleDescPai>
            </StyledHeader>
            
            <BodyCards >
                <BodyCardProduto>
                    <CardTitle>Informações do Produto</CardTitle>
                    <CardDesc>Preencha os dados do novo produto</CardDesc>
                    <Form onSubmit={handleSubmit}>
                        <LabelNomeProduto>Nome do Produto <CampoObrigatorio>*</CampoObrigatorio></LabelNomeProduto>
                        <InputNomeProduto type="text" placeholder="Ex: X-Burger" required value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}/>

                        <LabelDescricao>Descrição</LabelDescricao>
                        <InputDescricao type="text" placeholder="Ex: Pão, carne, queijo, alface e tomate" value={descricaoProduto} onChange={(e) => setDescricaoProduto(e.target.value)}/>

                        <LabelPreco>Preço <CampoObrigatorio>*</CampoObrigatorio></LabelPreco>
                        <InputPreco type="number" placeholder="0.00" required value={precoProduto} onChange={handlePrecoChange}/>

                        <LabelCategoria>Categoria <CampoObrigatorio>*</CampoObrigatorio></LabelCategoria>
                        <select 
                            required
                            value={selectedCategoriaId}
                            onChange={(e) => setSelectedCategoriaId(Number(e.target.value))} 
                        >
                            <option value="" disabled>
                                Selecione uma categoria
                            </option>
                            {categorias
                                .filter((c) => c.ativo === true)   // 🔥 só categorias ativas
                                .map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))
                            } 
                        </select>

                        <DivImageUpload>
                            <ImagemTitle>Escolha uma imagem</ImagemTitle>

                        <ImagePreview 
                        src={image ? URL.createObjectURL(image) : ImagemUpload}
                        alt="Preview da imagem"
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

                    <Img src={image ? URL.createObjectURL(image) : ImagemUpload} alt="Preview do Produto" />
                    <CardProductName >{nomeProduto || textPreviewNomeProduto}</CardProductName>
                    <CardProductDesc>{descricaoProduto || textPreviewDescricaoProduto}</CardProductDesc>
                    <DivPaiPriceBtnCarrinho>
                        <CardProductPrice>{precoProduto || textPreviewPrecoProduto}</CardProductPrice>
                        <ButtonAddCarrinho>Adicionar ao Carrinho</ButtonAddCarrinho>
                    </DivPaiPriceBtnCarrinho>                    
                </BodyCardPreview>
            </BodyCards>
        </Main>
    </BodyContainer>
    );
};