import { IoCart, IoSettings } from "react-icons/io5";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@/services/state/store";
import Badge from "./ui/Badge";
import { POST_LOGIN_PAGES } from "@/constants/pageRoutes";
import Logo from "./Logo";

const NavBar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const totalItems = cart.cartItems.reduce(
    (sum, cartItem) => sum + cartItem.count,
    0,
  );

  return (
    <div className="navbar flex justify-content-space-between align-items-center p-3 bg-subtile">
      <Logo link={POST_LOGIN_PAGES.PRODUCTS_PAGE} />
      <div className="flex gap-8">
        <Link
          to={POST_LOGIN_PAGES.CART_PAGE}
          className="cart-container position-relative inline-block text-primary"
        >
          <IoCart size={36} className="icon-link" />
          <Badge variant="error" number={totalItems} />
        </Link>
        <Link to={POST_LOGIN_PAGES.SETTINGS_PAGE} className="text-primary">
          <IoSettings size={36} className="icon-link" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
