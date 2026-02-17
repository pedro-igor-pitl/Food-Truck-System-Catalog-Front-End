import { useState } from "react";
import { verificarUsuario } from "../../services/verificarUsuarioPedido"; // import do service
import {
  VerificarContainer,
  VerificarCard,
  VerificarInput,
  VerificarButton,
  ErroMensagem
} from "./styles";
import { Navigate } from "react-router-dom";

export default function VerificarUsuario() {
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");

  const handleVerificar = async () => {
    if (!valor.trim()) {
      setErro("Digite um email ou telefone.");
      return;
    }

    // chama o service correto
    const usuario = await verificarUsuario(valor);

    if (usuario) {
      console.log("Usuário encontrado:", usuario);
      setErro("");
    //   Navigate("/revisarPedido");
    } else {
      console.log("Usuário não encontrado");
      setErro("Usuário não encontrado. Continue para cadastro.");
      // redirecionar para cadastro se quiser
    }
  };

  return (
    <VerificarContainer>
      <VerificarCard>
        <h2 style={{color: "black"}}>Verificação de Usuário</h2>

        <VerificarInput
          type="text"
          placeholder="Digite seu email ou telefone"
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