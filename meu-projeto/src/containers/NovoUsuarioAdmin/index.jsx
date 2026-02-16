import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "../../services/novoUsuarioAdmin";
import {
  Main,
  Container,
  Header,
  BackButton,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  FormRow,
  Input,
  Label,
  Select,
  TextArea,
  Button,
  CampoObrigatorio,
} from "./styles";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("C");
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createUsuario({
        nome,
        ativo: "true",
        email,
        senha,
        telefone,
        tipo,
        endereco
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <Main>
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>{"< Voltar"}</BackButton>
          <Title>Dados para Entrega</Title>
          <Subtitle>Preencha seus dados para finalizar o pedido</Subtitle>
        </Header>

        <form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <FormRow>
              <Label>Nome Completo <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </FormRow>

            <FormRow>
              <Label>Senha<CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="Senha do Usuario"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </FormRow>

            <FormRow>
              <Label>Telefone <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="(85) 99921-1224"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </FormRow>

            <FormRow>
              <Label>E-mail (opcional)</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormRow>

            <FormRow>
              <Label>Tipo de Usuário <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="C">Cliente</option>
                <option value="A">Administrador</option>
              </Select>
            </FormRow>
          </Section>

          <Section>
            <SectionTitle>Endereço de Entrega</SectionTitle>
            <FormRow>
              <Label>Rua/Avenida <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="Nome da rua"
                value={endereco.rua}
                onChange={(e) =>
                  setEndereco({ ...endereco, rua: e.target.value })
                }
                required
              />
            </FormRow>

            <FormRow>
              <Label>Número <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="123"
                value={endereco.numero}
                onChange={(e) =>
                  setEndereco({ ...endereco, numero: e.target.value })
                }
                required
              />
            </FormRow>

            <FormRow>
              <Label>Bairro <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="Nome do bairro"
                value={endereco.bairro}
                onChange={(e) =>
                  setEndereco({ ...endereco, bairro: e.target.value })
                }
                required
              />
            </FormRow>

            <FormRow>
              <Label>Cidade <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="Cidade"
                value={endereco.cidade}
                onChange={(e) =>
                  setEndereco({ ...endereco, cidade: e.target.value })
                }
                required
              />
            </FormRow>

            <FormRow>
              <Label>Estado <CampoObrigatorio>*</CampoObrigatorio></Label>
                <Input
                placeholder="Estado"
                value={endereco.estado}
                onChange={(e) =>
                  setEndereco({ ...endereco, estado: e.target.value })
                }
                required
              />

            </FormRow>

            <FormRow>
              <Label>CEP <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input
                placeholder="00000-000"
                value={endereco.cep}
                onChange={(e) =>
                  setEndereco({ ...endereco, cep: e.target.value })
                }
                required
              />
            </FormRow>

            <FormRow>
              <Label>Complemento</Label>
              <Input
                placeholder="Complemento..."
                value={endereco.com}
                onChange={(e) =>
                  setEndereco({ ...endereco, complemento: e.target.value })
                }
                required
              />
            </FormRow>
          </Section>

          <Button type="submit">Salvar</Button>
        </form>
      </Container>
    </Main>
  );
}
