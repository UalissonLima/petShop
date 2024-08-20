import "./header.css";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CarrinhoContexto } from "../../contexts/CarrinhoContext";
import { useContext } from "react";

export default function Header() {
  const { carrinhoQuantidade } = useContext(CarrinhoContexto);

  return (
    <header>
      <Link to="/" className="containerLogo">
        Pet<span>Shop</span>
      </Link>

      <Link to="/carrinho">
        <div className="containerCarrinho">
          <span className="material-symbols-outlined">
            <HiOutlineShoppingCart size={27} color="black" />
            {carrinhoQuantidade > 0 && (
              <span className="notificacao">{carrinhoQuantidade}</span>
            )}
          </span>
        </div>
      </Link>
    </header>
  );
}
