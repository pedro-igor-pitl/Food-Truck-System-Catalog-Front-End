export async function createProduto(produtoData) {
    try {
        const response = await fetch(`http://localhost:8080/produto/cadastrar/${produtoData.categoriaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produtoData),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar produto');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}
