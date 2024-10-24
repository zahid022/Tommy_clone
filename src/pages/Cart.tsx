import { useEffect, useRef, useState } from "react"
import CartList from "../components/cart/CartList"
import DetailAccordion from "../components/detail/DetailAccordion"
import { useAppSelector } from "../store/Hooks"
import { CartUserType, PromoCodeType } from "../types/Type"
import PromoCode from "../components/cart/PromoCode"
import { useAllPromoCodeQuery } from "../store/Api"

function Cart() {

    const { basket } = useAppSelector(state => state.basket)
    const [total, setTotal] = useState<number>(0)
    const [ttl, setTtl] = useState<number>(0)

    const [fix, setFix] = useState<boolean>(false)

    const contentRef = useRef<HTMLDivElement>(null)

    const [code, setCode] = useState<string>('')

    const [precent, setPrecent] = useState<number>(0)

    const { data, isLoading } = useAllPromoCodeQuery()

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                let bl = (contentRef.current.scrollHeight - 500) < window.scrollY
                setFix(bl)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (code.length > 0 && !isLoading) {
            const promoCode = data?.find((item: PromoCodeType) => item.name === code)
            if (promoCode) {
                setPrecent(+promoCode.precent)
            }
        }
    }, [code])

    useEffect(() => {
        if (precent) {
            const kod = (total - ((total * precent) / 100))
            setTtl(kod)
        } else {
            setTtl(total)
        }
    }, [precent, total])

    let kod = 0

    useEffect(() => {
        if (basket.length > 0) {
            basket.forEach((item,) => kod += (+item.price * +item.count))
        }
        setTotal(kod)
    }, [basket])

    return (
        <main className="py-10 relative">
            <div className="wrapper">
                <div
                    ref={contentRef}
                    className="lg:flex lg:justify-between lg:w-10/12 lg:mx-auto">
                    <div className="mb-4 lg:w-7/12 lg:mb-0">
                        <div className="mb-2 pb-2 border-b">
                            <p className="text-[#484848] text-[14px] mb-2">Free shipping on orders of $100+ </p>
                            <div>
                                <h2 className="text-[#00174f] md:text-[22px] lg:text-[34px] text-[18px] font-semibold">Shopping Bag <span className="text-[14px] text-[#484848] font-normal">({basket.length > 0 ? basket.length : 0} item)</span></h2>
                            </div>
                        </div>
                        <div>
                            {basket.length > 0 ? (
                                basket.map((item: CartUserType, i: number) => {
                                    return <div key={i}>
                                        <CartList item={item} />
                                    </div>
                                })
                            ) : (
                                <div>
                                    Sebet Bosdur!!
                                </div>
                            )}
                        </div>
                        <ul>
                            <DetailAccordion basketList={true} txt="Gift Options" />
                        </ul>
                    </div>
                    <div className="lg:w-3/12">
                        <h2 className="text-[#00174f] text-[18px] mb-3 font-semibold">Order Summary</h2>
                        <div>
                            <ul>
                                <li className="flex mb-3 items-center justify-between">
                                    <p className="text-[#00174f] text-[14px]">Subtotal</p>
                                    <span className="text-[#484848] text-[14px]">${total}</span>
                                </li>
                                <li className="flex mb-3 items-center justify-between">
                                    <p className="text-[#00174f] text-[14px]">Shipping</p>
                                    <span className="text-[#484848] text-[14px]">FREE</span>
                                </li>
                                <li className="flex mb-3 items-center justify-between">
                                    <p className="text-[#00174f] text-[14px]">Tax</p>
                                    <span className="text-[#484848] text-[14px]">Calculated in checkout</span>
                                </li>
                            </ul>
                            <div>
                                <PromoCode setCode={setCode} txt="Promo Code" />
                            </div>
                            <div className={`${precent ? "block" : 'hidden'} text-center text-red-500 text-[12px] font-medium pt-1`}>
                                {precent &&
                                    <p>Added {precent}% promo code</p>
                                }
                            </div>
                            <div className="flex py-3 justify-between items-center">
                                <p className="text-[#00174f]">Estimated Total</p>
                                <div className="flex gap-1 items-center">
                                    <p className={`${precent ? 'line-through' : 'hidden'} text-red-500`}>${total}</p>
                                    <p className="text-[#00174f]">${ttl.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-[14px] text-center mb-4 pt-4">4 interest-free payments of $33.26 with Klarna.</p>
                                <p className="text-[14px] text-center">or 4 interest-free payments of $33.26 with </p>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <button className="w-full h-14 hover:underline bg-[#0e845a] justify-center items-center text-white rounded-sm flex">
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    boxShadow: '0px -4px 3px 0px rgba(0, 0, 0, 0.1)'
                }}
                className={`fixed bottom-0 ${fix ? 'translate-y-[300%] h-0 opacity-0 -z-[1]' : 'z-[999] translate-y-0 h-auto opacity-[1]'} lg:!hidden duration-300 left-0 right-0 bg-white  py-4`}>
                <div className="wrapper">
                    <div>
                        <button className="w-full h-14 hover:underline bg-[#0e845a] justify-center items-center text-white rounded-sm flex">
                            Go to checkout
                        </button>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Cart