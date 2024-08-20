import styles from "./carrinho.module.css";
import {
  CarrinhoContexto,
  CarrinhoProps,
} from "../../contexts/CarrinhoContext";
import { useContext, useEffect, useState } from "react";

export default function Carrinho() {
  const { addProdutoCarrinho, carrinho, total } = useContext(CarrinhoContexto);

  const [produtosCarrinho, setProdutoCarrinho] = useState<CarrinhoProps[]>([]);

  useEffect(() => {
    setProdutoCarrinho(carrinho);
  }, [carrinho]);

  return (
    <div className={styles.containerPrincipal}>
      {produtosCarrinho.map((produto) => (
        <div className={styles.containerCarrinho} key={produto.id}>
          <span className={styles.tituloProduto}>{produto.title}</span>
          <section className={styles.containerProduto}>
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
                <button className={styles.btnQnt}>-</button>
              </div>

              <div className={styles.containerPreco}>
                {produto.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </section>
        </div>
      ))}
      <section className={styles.containerTotal}><button>CONFIRMAR COMPRA</button>{total}</section>
    </div>
  );
}
