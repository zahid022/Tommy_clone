import { useRef, useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface PromoCodeType {
    txt: string;
    setCode : (value: string) => void;
}


function PromoCode({ txt, setCode }: PromoCodeType) {
    const [flag, setFlag] = useState<boolean>(false);
    const [height, setHeight] = useState<string>('0px');
    const contentRef = useRef<HTMLDivElement>(null);
    const [promo, setPromo] = useState<string>('')

    useEffect(() => {
        if (contentRef.current) {
            setHeight(flag ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [flag]);

    return (
        <div className={`relative border-b border-t border-[#e5e5e5]`}>
            <button
                onClick={() => setFlag(!flag)}
                className="flex cursor-pointer text-[#00174f] py-5 items-center w-full justify-between">
                <p className='text-[#00174f] font-semibold text-[14px]'>{txt}</p>
                {!flag ? <FaPlus /> : <FaMinus />}
            </button>
            <div
                ref={contentRef}
                style={{
                    maxHeight: height,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
                className="duration-300">
                <div className='flex justify-between pb-3'>
                    <div className='w-8/12 relative'>
                        <input
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPromo(e.target.value)}
                            type="text"
                            className='pt-5 pr-3 pb-[6px] text-[16px] pl-4 rounded-[3px] border outline-none h-14 border-[#00174f] inset-0 block w-full peer'
                            name='text'
                            required
                        />
                        <label
                            htmlFor="text"
                            className='absolute top-4 left-4 text-[16px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                            Promo Code
                        </label>
                    </div>
                    <div className='w-3/12'>
                        <button 
                        onClick={() => setCode(promo)}
                        className='border h-14 border-[#00174f] rounded-sm block w-full'>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromoCode;
