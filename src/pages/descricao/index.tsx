import { CarrinhoContexto } from "../../contexts/CarrinhoContext";
import { useContext, useEffect, useState } from "react";
import { ProdutosProps } from "../home";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./descricao.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function Descricao() {
  const { produtoDescricao, addProdutoCarrinho } = useContext(CarrinhoContexto);
  const [produtos, setProdutos] = useState<ProdutosProps[]>([]);

  useEffect(() => {
    setProdutos(produtoDescricao);
  }, [produtoDescricao]);

  function handleCarrinho(produto: ProdutosProps) {
    addProdutoCarrinho(produto);
    mostrarToast();
  }

  function mostrarToast() {
    toast.success("Adicionado ao carrinho", {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
    });
  }

  return (
    <div className="containerDescricaoPrincipal">
      {produtos.map((produto) => (
        <section className="containerProdutoDescricao" key={produto.id}>
          <img
            src={produto.cover}
            className="containerImgDescricao"
            alt={produto.title}
          />
          <div className="containerTxtDescricao">
            <h1>{produto.title}</h1>
            <p>{produto.subtitle}</p>
            <h4>
              {produto.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
            <div
              className="containerBtnDescricao"
              onClick={() => handleCarrinho(produto)}
            >
              ADICIONAR AO CARRINHO
              <HiOutlineShoppingCart size={27} color="black" />
            </div>
          </div>
        </section>
      ))}
      <ToastContainer></ToastContainer>
    </div>
  );
}
