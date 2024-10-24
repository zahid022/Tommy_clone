import { useNavigate } from "react-router-dom";
import { useGetByIdProductQuery } from "../../store/Api";
import { deleteItem } from "../../store/BasketSlice";
import { useAppDispatch } from "../../store/Hooks";
import { CartUserType } from "../../types/Type"
import Quantitiy from "../static/Quantitiy";

interface CartListType {
    item: CartUserType;
}

function CartList({ item }: CartListType) {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { data, isLoading } = useGetByIdProductQuery(item.productId)

    if (isLoading) {
        return <div>
            Loading...
        </div>
    }

    function deleteBasketItem() {
        dispatch(deleteItem(item.productId))
    }

    return (
        <div className="py-4 border-b">
            <div className="flex">
                <div className="w-3/12 lg:w-3/12">
                    <img className="w-[100px] lg:w-[143px] lg:h-[190px] h-[130px]" src={data?.images?.[0]} alt="" />
                </div>
                <div className="w-9/12 pl-2">
                    <div className="h-full lg:hidden flex flex-col justify-between">
                        <div>
                            <p
                                onClick={() => navigate(`/en/detail/${item.productId}`)}
                                className="text-[#00174f] text-[14px] hover:underline cursor-pointer">{data?.name}</p>
                            <div className="capitalize text-[14px] text-[#484848]">
                                <span>{item.color}</span> |
                                <span>{item.size}</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div>
                                <Quantitiy cart={true} value={item.count} />
                            </div>
                            <div className="text-[#484848] text-[14px]">
                                <p className={`${data?.discount ? 'line-through' : ''}`}>${data?.price}</p>
                                <p className={`${data?.discount ? '' : 'hidden'}`}>${data && (+data?.price - +data?.discount)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-full hidden lg:flex flex-col justify-between">
                        <div className="w-full flex justify-between">
                            <div>
                                <p
                                    onClick={() => navigate(`/en/detail/${item.productId}`)}
                                    className="text-[#00174f] text-[14px] hover:underline cursor-pointer">{data?.name}</p>
                                <div className="capitalize text-[14px] text-[#484848]">
                                    <span>{item.color}</span> |
                                    <span>{item.size}</span>
                                </div>
                                <div className="pt-8">
                                    <p className="text-[14px] text-[#484848]"><span className="text-[#00174f]">In Stock: </span> Ships in 1-2 business days</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Quantitiy cart={true} value={item.count} />
                                </div>
                                <div className="text-[#484848] flex justify-between pt-1 text-[14px]">
                                    <p className={`${data?.discount ? 'line-through' : ''}`}>${data?.price}</p>
                                    <p className={`${data?.discount ? '' : 'hidden'}`}>${data && (+data?.price - +data?.discount)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={deleteBasketItem} className="text-[#484848] underline text-[14px]">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-3 lg:hidden">
                <p className="text-[14px] text-[#484848]"><span className="text-[#00174f]">In Stock: </span> Ships in 1-2 business days</p>
                <button onClick={deleteBasketItem} className="text-[#484848] underline text-[14px]">Remove</button>
            </div>
        </div>
    )
}

export default CartList