import { useState } from "react";
import { verificarUsuario } from "../../services/verificarUsuarioPedido"; // import do service
import {
  VerificarContainer,
  VerificarCard,
  VerificarInput,
  VerificarButton,
  ErroMensagem
} from "./styles";

import { useNavigate } from "react-router-dom";

export default function VerificarUsuario() {
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");

  const handleVerificar = async () => {
    if (!valor.trim()) {
      setErro("Digite um email ou telefone.");
      return;
    }

    const usuario = await verificarUsuario(valor);

    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("usuario");

    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    navigate("/RealizarPedido", {
      state: {
        usuario: usuario || null,
        email: valor
      }
    });
  };

  return (
    <VerificarContainer>
      <VerificarCard>
        <h2 style={{color: "black"}}>Verificação de Usuário</h2>

        <VerificarInput
          type="text"
          placeholder="Digite seu email"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        {erro && <ErroMensagem>{erro}</ErroMensagem>}

        <VerificarButton onClick={handleVerificar}>
          Verificar
        </VerificarButton>
      </VerificarCard>
    </VerificarContainer>
  );
}