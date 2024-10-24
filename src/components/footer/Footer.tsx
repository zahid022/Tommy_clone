import { useAppSelector } from "../../store/Hooks"
import CartSidebar from "../cart/CartSidebar"
import FooterBottom from "./FooterBottom"
import FooterTop from "./FooterTop"

function Footer() {
  const {cart} = useAppSelector(state => state.basket)
  return (
    <footer>
      <CartSidebar cart={cart} />
      <FooterTop />
      <FooterBottom />
    </footer>
  )
}

export default Footer