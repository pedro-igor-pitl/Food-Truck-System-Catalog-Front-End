import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Main,
  Container,
  Header,
  BackButton,
  Title,
  Subtitle,
  Form,
  Label,
  Input,
  TextArea,
  Button,
  ObrigatorioAsterisco,
  AtivoContainer
} from "./styles.js";

import { createCategoria } from "../../services/NovaCategoriaAdmin.js";

export default function App() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const categoriaData = {
        nome,
        descricao,
        ativo: ativo, 
      };
      
      await createCategoria(categoriaData);
      setMessage("✅ Categoria cadastrada com sucesso!");
      setNome("");
      setDescricao("");
      setAtivo(false);
    } catch (error) {
      setMessage("❌ Erro ao cadastrar categoria.");
    } finally {
      setLoading(false);
    }
  };

  const VoltarDashBoard = () => {
    history.go(-1);
  };

  return (
    <Main>
      <Container>
        <Header>
          <BackButton onClick={VoltarDashBoard}>{"< Voltar"}</BackButton>
          <Title>Cadastro de Categoria</Title>
          <Subtitle>Preencha os campos abaixo.</Subtitle>
        </Header>

        <Form as="form" onSubmit={handleSubmit}>
          <Label>
            Nome <ObrigatorioAsterisco>*</ObrigatorioAsterisco>
          </Label>
          <Input
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <Label>Descrição</Label>
          <TextArea
            placeholder="Digite a descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <Label>
            Ativo <ObrigatorioAsterisco>*</ObrigatorioAsterisco>
          </Label>
          <AtivoContainer>
            <Input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            <span>Ativar categoria</span>
          </AtivoContainer>
         
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Form>
      </Container>
    </Main>
  );
}
