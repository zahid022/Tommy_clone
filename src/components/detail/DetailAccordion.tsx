import { useRef, useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface DetailAccordionType {
    txt: string;
    data?: string[] | undefined;
    basketList?: boolean;
}


function DetailAccordion({ txt, data, basketList }: DetailAccordionType) {
    const [flag, setFlag] = useState<boolean>(false);
    const [height, setHeight] = useState<string>('0px');
    const contentRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(flag ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [flag]);

    return (
        <li className={`relative border-b border-[#e5e5e5] ${!basketList && 'border-t'} `}>
            <button
                onClick={() => setFlag(!flag)}
                className="flex cursor-pointer text-[#00174f] py-5 items-center w-full justify-between">
                <p className='text-[#00174f] font-semibold text-[14px]'>{txt}</p>
                {!flag ? <FaPlus /> : <FaMinus />}
            </button>
            {data &&
                <ul
                    ref={contentRef}
                    style={{
                        maxHeight: height,
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                    }}
                    className="duration-300 pl-8">
                    {data?.map((item: string, i: number) => (
                        <li className='mb-3 text-[14px] text-[#00174f]' key={i}>{item}</li>
                    ))}
                </ul>
            }
            {!data &&
                <ul
                    ref={contentRef}
                    style={{
                        maxHeight: height,
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                    }}
                    className="duration-300">
                    <li className='mb-3 text-[14px] text-[#00174f]' >
                        Send in a gift box ($5.00 per order)
                    </li>
                    <li className='mb-3 text-[14px] text-[#00174f]' >
                        Include a gift note (FREE)
                    </li>
                </ul>
            }
        </li>
    );
}

export default DetailAccordion;
