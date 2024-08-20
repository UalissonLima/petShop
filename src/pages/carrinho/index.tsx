import styles from "./carrinho.module.css";
import {
  CarrinhoContexto,
  CarrinhoProps,
} from "../../contexts/CarrinhoContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Carrinho() {
  const { addProdutoCarrinho, carrinho, total, removeProdutoCarrinho } =
    useContext(CarrinhoContexto);

  const [produtosCarrinho, setProdutoCarrinho] = useState<CarrinhoProps[]>([]);
  const [temProduto, setTemProduto] = useState(false);

  useEffect(() => {
    setProdutoCarrinho(carrinho);
    verificaCarrinho();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrinho]);

  function verificaCarrinho() {
    if (carrinho.length > 0) {
      setTemProduto(true);
    } else {
      setTemProduto(false);
    }
  }

  function confimaCompra() {
    toast.success("Parabéns! Você confirmou sua compra", {
      position: "bottom-center",
      autoClose: 5000,
      className: "toast-custom",
    });
  }

  return (
    <>
      {temProduto ? (
        <div className={styles.containerPrincipal}>
          {produtosCarrinho.map((produto) => (
            <div className={styles.containerCarrinho} key={produto.id}>
              <span className={styles.tituloProduto}>{produto.title}</span>

              <div className={styles.faixaProduto}>
                <img src={produto.cover} alt="" />

                <div className={styles.containerBtnsQnt}>
                  <button
                    className={styles.btnQnt}
                    onClick={() => addProdutoCarrinho(produto)}
                  >
                    +
                  </button>
                  {produto.quantidade}
                  <button
                    className={styles.btnQnt}
                    onClick={() => removeProdutoCarrinho(produto)}
                  >
                    -
                  </button>
                </div>

                <div className={styles.containerPreco}>
                  {produto.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </div>
          ))}
          <section className={styles.containerTotal}>
            <button
              className={styles.BtnConfirmaCompra}
              onClick={confimaCompra}
            >
              CONFIRMAR COMPRA
            </button>
            {total}
          </section>
          <ToastContainer></ToastContainer>
        </div>
      ) : (
        <div className={styles.containerVazio}>
          <section>Seu carrinho está vazio...</section>
          <Link to="/">
            <button className={styles.BtnVerProdutos}>
              Clique para ver nossas melhores ofertas
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
