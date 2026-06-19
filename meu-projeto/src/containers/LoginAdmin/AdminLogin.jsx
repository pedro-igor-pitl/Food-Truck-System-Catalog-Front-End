import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/LoginApi.js";

import {
  Container,
  Card,
  IconWrapper,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Input,
  Button,
} from "./styles.js";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await login(email, senha);

      if (!token) {
        throw new Error("Token não recebido");
      }

      // 🔥 PADRÃO ÚNICO DO SISTEMA
      localStorage.setItem("token", token);

      // opcional: marca login
      localStorage.setItem("isAdminLogged", "true");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <IconWrapper>
          <Lock size={24} color="white" />
        </IconWrapper>

        <Title>Acesso Administrativo</Title>
        <Subtitle>Entre com suas credenciais de administrador</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Mail size={20} color="#9CA3AF" />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Lock size={20} color="#9CA3AF" />
            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </InputGroup>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}