import "./home.css";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { CarrinhoContexto } from "../../contexts/CarrinhoContext";
import { useNavigate } from "react-router-dom";

export interface ProdutosProps {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  cover: string;
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutosProps[]>([]);

  const { mostraDescricao } = useContext(CarrinhoContexto);
  const navigate = useNavigate();

  function handleDescricao(idProduto: string, produto: ProdutosProps) {
    mostraDescricao(produto);
    navigate(`produtos/${idProduto}`, { replace: true });
  }

  useEffect(() => {
    async function obtemProdutos() {
      const response = await api.get("/products");
      setProdutos(response.data);
    }

    obtemProdutos();
  }, []);

  return (
    <div className="containerPrincipal">
      <h1>Confira as melhores rações para o seu amiguinho de quatro patas!</h1>
      <main>
        <section className="containerCatalogo">
          {produtos.map((produto) => (
            <div
              className="containerProduto"
              key={produto.id}
              onClick={() => handleDescricao(produto.id, produto)}
            >
              <img src={produto.cover} alt={produto.title} />
              <p title={produto.title}>{produto.title}</p>
              <strong>
                {produto.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </div>
          ))}
        </section>
        <aside className="containerPropaganda"></aside>
      </main>
    </div>
  );
}
