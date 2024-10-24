import { useEffect, useState } from "react"
import { FaAngleDown } from "react-icons/fa"

interface quantitiyType{
    cart : boolean;
    value? : number;
    setCount ? : (value: number) => void | undefined;
}

function Quantitiy({cart, value, setCount} : quantitiyType) {
    const [flag, setFlag] = useState(false)
    const [num, setNum] = useState(value ? value : 1)

    useEffect(() => {
        if(setCount){
            setCount(num)
        }
    }, [num])

    return (
        <div className="relative w-[80px] px-2 py-[0.5px] rounded-sm border border-[#00174f]">
            <div onClick={() => setFlag(value ? false : !flag)} className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-[#484848]">Qty</p>
                    <span className="text-[12px] text-[#00174f]">{num}</span>
                </div>
                <div>
                    <FaAngleDown className="text-[16px]" />
                </div>
            </div>
            <div
                style={{
                    visibility: flag ? "visible" : "hidden"
                }}
                className={`${flag ? 'z-[900] opacity-[1]' : '-z-[1] opacity-0'} border absolute ${cart ? 'top-[101%]' : 'bottom-[101%]'} bg-white right-0 left-0`}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div onClick={() => {
                        setNum(i + 1)
                        setFlag(false)
                    }} className="py-1 px-2 text-[#00174f] text-[14px]" key={i}>{i + 1}</div>
                ))}
            </div>
        </div>
    )
}

export default Quantitiy