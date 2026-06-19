export async function login(email, senha) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos");
  }

  // Se for 204, não há JSON para ler
  if (response.status === 204) {
    return null; // ou algum valor padrão
  }

  const data = await response.json();
  localStorage.setItem("adminName", data.nome);
  return data.token;
}
