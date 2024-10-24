import { FaXmark } from "react-icons/fa6"
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setCart } from "../../store/BasketSlice";
import { useNavigate } from "react-router-dom";

interface CartSidebarProps {
    cart: boolean;
}

function CartSidebar({ cart }: CartSidebarProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [pul, setPul] = useState<number>(0)

    useEffect(() => {
        if (cart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [cart]);

    const { basket } = useAppSelector(state => state.basket)

    useEffect(() => {
        if (basket.length > 0) {
            const total = basket.reduce((akk, item) => akk += (item.count * item.price), 0)
            setPul(total)
        }
    }, [basket])

    return (
        <div
            style={{
                visibility: cart ? "visible" : 'hidden'
            }}
            className={`fixed inset-0 hidden ${cart ? 'z-[999] opacity-[1]' : 'z-[-1] opacity-0'} lg:flex bg-[#00000080]`}>
            <div className="h-full w-full relative">
                <div className={`bg-white min-w-[504px] ${cart ? 'translate-x-0' : 'translate-x-[300%]'} duration-300 absolute py-10 h-screen right-0`}>
                    <div className="relative">
                        <div className="flex border-b pb-4 items-center px-10 justify-between">
                            <p className="text-[22px] text-[#00174f] font-semibold">Shopping Bag</p>
                            <button onClick={() => dispatch(setCart(false))} className="bg-[#f9fafb] rounded-full p-2">
                                <FaXmark className="text-[16px] text-[#00174f]" />
                            </button>
                        </div>
                        <div className="py-5 px-10 pb-[276px] pt-8 scrollbar-hide h-screen overflow-y-auto">
                            {basket.length > 0 ? (
                                basket.map((item, i) => (
                                    <div key={i} className="mb-5">
                                        <CartItem item={item} />
                                    </div>
                                ))
                            ) : (
                                <div>Sebet bosdur</div>
                            )}
                        </div>
                        <div className="fixed px-10 py-5 bg-white border-t bottom-0 right-0 min-w-[504px]">
                            <div>
                                <div className="flex items-center mb-6 justify-between">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#00174f] text-[16px]">Subtotal</p>
                                        <p className="text-[#484848] text-[16px]">{basket.length > 0 ? basket.length : 0} Items</p>
                                    </div>
                                    <div>
                                        <p className="text-[#00174f] text-[16px]">$ {pul}</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            navigate(`cart`)
                                            dispatch(setCart(false))
                                        }}
                                        className="py-4 hover:bg-[#0c6d4b] hover:underline flex w-full justify-center items-center rounded-[3px] mb-6 bg-[#0e845a] text-white">Review + Checkout</button>
                                </div>
                                <div>
                                    <p className="text-center text-[#484848] text-[14px]">Shipping & Taxes Calculated at Checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartSidebar