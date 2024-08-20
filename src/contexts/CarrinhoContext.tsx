import { createContext, ReactNode, useEffect, useState } from "react";
import { ProdutosProps } from "../pages/home";

interface CarrinhoContextoData {
  mostraDescricao: (produto: ProdutosProps) => void;
  produtoDescricao: ProdutosProps[];
  addProdutoCarrinho: (produto: ProdutosProps) => void;
  carrinho: CarrinhoProps[];
  carrinhoQuantidade: number;
  total: string;
  removeProdutoCarrinho: (produto: CarrinhoProps) => void;
}

export interface CarrinhoProps {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  cover: string;
  quantidade: number;
  total: number;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoContexto = createContext({} as CarrinhoContextoData);

function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [carrinho, setCarrinho] = useState<CarrinhoProps[]>([]);
  const [produtoDescricao, SetProdutoDescricao] = useState<ProdutosProps[]>([]);
  const [total, setTotal] = useState("");

  function mostraDescricao(produto: ProdutosProps) {
    SetProdutoDescricao([produto]);
  }

  function addProdutoCarrinho(novoProduto: ProdutosProps) {
    const indexProduto = carrinho.findIndex(
      (item) => item.id === novoProduto.id
    );

    if (indexProduto !== -1) {
      const listaCarrinho = [...carrinho];
      listaCarrinho[indexProduto].quantidade += 1;
      listaCarrinho[indexProduto].total =
        listaCarrinho[indexProduto].quantidade *
        listaCarrinho[indexProduto].price;
      setCarrinho(listaCarrinho);
    } else {
      const data = {
        ...novoProduto,
        quantidade: 1,
        total: novoProduto.price,
      };
      setCarrinho((produtos) => [...produtos, data]);
    }
  }

  function removeProdutoCarrinho(produto: CarrinhoProps) {
    const indexProduto = carrinho.findIndex((item) => item.id === produto.id);

    if (indexProduto !== -1) {
      if (carrinho[indexProduto].quantidade > 1) {
        const listaCarrinho = [...carrinho];
        listaCarrinho[indexProduto].quantidade -= 1;
        listaCarrinho[indexProduto].total =
          listaCarrinho[indexProduto].quantidade *
          listaCarrinho[indexProduto].price;
        setCarrinho(listaCarrinho);
      } else {
        const removeProduto = carrinho.filter((item) => item.id !== produto.id);
        setCarrinho(removeProduto);
      }
      totalCarrinho(carrinho);
    }
  }

  function totalCarrinho(produto: CarrinhoProps[]) {
    const resultado = produto.reduce((acc, obj) => acc + obj.total, 0);

    const formatar = resultado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setTotal(formatar);
  }

  useEffect(() => {
    totalCarrinho(carrinho);
  }, [carrinho]);

  return (
    <CarrinhoContexto.Provider
      value={{
        mostraDescricao,
        produtoDescricao,
        addProdutoCarrinho,
        carrinho,
        carrinhoQuantidade: carrinho.length,
        total,
        removeProdutoCarrinho,
      }}
    >
      {children}
    </CarrinhoContexto.Provider>
  );
}

export default CarrinhoProvider;
