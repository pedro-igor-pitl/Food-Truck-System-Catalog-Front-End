import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import buscarUsuarioEditar from "../../services/buscarUsuarioEditar";
import { alterarUsuario } from "../../services/alterarUsuarioAdmin";

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
  Button,
  CampoObrigatorio,
} from "./styles";

export default function AlterarUsuario() {
  const navigate = useNavigate();
  const { idUsuario } = useParams();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("C");
  const [ativo, setAtivo] = useState(true);

  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  // 🔹 Carregar usuário ao abrir
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuario = await buscarUsuarioEditar(idUsuario);

        if (usuario) {
          setNome(usuario.nome);
          setSenha(""); // geralmente não retorna senha
          setTelefone(usuario.telefone);
          setEmail(usuario.email);
          setTipo(usuario.tipo);
          setAtivo(usuario.ativo === "Sim");

          setEndereco({
            rua: usuario.rua || "",
            numero: usuario.numero || "",
            bairro: usuario.bairro || "",
            cidade: usuario.cidade || "",
            estado: usuario.estado || "",
            cep: usuario.cep || "",
            complemento: usuario.complemento || ""
          });

        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao carregar dados do usuário.");
      }
    };

    if (idUsuario) carregarUsuario();
  }, [idUsuario]);

  // 🔹 Enviar alteração
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await alterarUsuario(idUsuario, {
        nome,
        senha: senha || undefined,
        telefone,
        email,
        tipo,
        ativo: ativo ? "Sim" : "Não",
        endereco
      });



      alert("Usuário alterado com sucesso!");
      navigate("/dashboard/usuario", { state: { updated: true } });

    } catch (error) {
      console.error("Erro ao alterar usuário:", error);
      alert("Erro ao alterar usuário.");
    }
  };

  return (
    <Main>
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>{"< Voltar"}</BackButton>
          <Title>Alterar Usuário</Title>
          <Subtitle>Atualize os dados do usuário</Subtitle>
        </Header>

        <form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Dados Pessoais</SectionTitle>

            <FormRow>
              <Label>Nome <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
            </FormRow>

            <FormRow>
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="Deixe vazio para não alterar"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormRow>

            <FormRow>
              <Label>Telefone <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            </FormRow>

            <FormRow>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormRow>

            <FormRow>
              <Label>Tipo <CampoObrigatorio>*</CampoObrigatorio></Label>
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="C">Cliente</option>
                <option value="A">Administrador</option>
              </Select>
            </FormRow>

            <FormRow>
              <Label>Ativo</Label>
              <Select
                value={ativo ? "true" : "false"}
                onChange={(e) => setAtivo(e.target.value === "true")}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </Select>

            </FormRow>
          </Section>

          <Section>
            <SectionTitle>Endereço</SectionTitle>

            <FormRow>
              <Label>Rua</Label>
              <Input value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>Número</Label>
              <Input value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>Bairro</Label>
              <Input value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>Cidade</Label>
              <Input value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>Estado</Label>
              <Input value={endereco.estado} onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>CEP</Label>
              <Input value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })} />
            </FormRow>

            <FormRow>
              <Label>Complemento</Label>
              <Input
                value={endereco.complemento}
                onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
              />
            </FormRow>
          </Section>

          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Container>
    </Main>
  );
}