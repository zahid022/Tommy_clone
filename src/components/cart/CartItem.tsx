import { Link } from "react-router-dom";
import Quantitiy from "../static/Quantitiy";
import { CartUserType } from "../../types/Type";
import { useGetByIdProductQuery } from "../../store/Api";
import { useAppDispatch } from "../../store/Hooks";
import { deleteItem, setCart } from "../../store/BasketSlice";

interface cartItemType {
  item: CartUserType
}

function CartItem({ item }: cartItemType) {
  const { data } = useGetByIdProductQuery(item.productId)

  const dispatch = useAppDispatch()

  function handleDeleteCart() {
    dispatch(deleteItem(item.productId))
  }

  return (
    <div className={`flex gap-8`}>
      <div className={`w-[143px] h-[180px]`}>
        <img
          className="w-full h-full"
          src={data?.images?.[0]}
          alt={data?.name}
        />
      </div>
      <div className={`flex flex-col w-[240px] justify-between`}>
        <div>
          <p className="text-[14px] font-normal capitalize text-[#00174f]">
            <Link 
            to={`/en/detail/${item.productId}`} 
            onClick={() => dispatch(setCart(false))}
            className="hover:text-[#cc0c2f] hover:underline">
              {data?.name}
            </Link>
          </p>
          <div>
            <span className="text-[14px] capitalize text-[#484848]">{item.color} | {item.size}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#484848] line-through">$ {data?.price}</p>
            <p className="text-[#00174f]">${data && (+data.price - +data.discount)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <Quantitiy value={item.count} cart={true} />
          </div>
          <button
            onClick={handleDeleteCart}
            className="text-[14px] text-[#484848] border-b border-[#484848]">Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem