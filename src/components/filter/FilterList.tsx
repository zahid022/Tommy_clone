import { useRef, useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { GeneralCategory } from '../../types/Type';
import InputRange from './InputRange';
import { useDispatch } from 'react-redux';
import { setColor, setSize } from '../../store/FilterSlice';
import { useSearchParams } from 'react-router-dom';

interface filterListType {
    txt: string;
    data?: GeneralCategory[] | undefined;
    priceFlag?: boolean;
}

function FilterList({ txt, data, priceFlag }: filterListType) {
    const [flag, setFlag] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(''); 
    const [height, setHeight] = useState<string>('0px');
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams(); 

    useEffect(() => {
        if (contentRef.current) {
            setHeight(flag ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [flag, data]);

    const handleChange = (item: string) => {
        let newParams = new URLSearchParams(searchParams); 

        if (selectedValue === item) {
            setSelectedValue(''); 
            if (txt === "Category") {
                newParams.delete('generalCategory');
            }
            if (txt === "Color") {
                dispatch(setColor(''));
                newParams.delete('color');
            }
            if (txt === "Size") {
                dispatch(setSize(''));
                newParams.delete('size'); 
            }
        } else {
            setSelectedValue(item); 
            if (txt === "Category") {
                newParams.set('generalCategory', item.toLowerCase()); 
            }
            if (txt === "Color") {
                dispatch(setColor(item.toLowerCase()));
                newParams.set('color', item.toLowerCase());
            }
            if (txt === "Size") {
                dispatch(setSize(item.toLowerCase()));
                newParams.set('size', item.toLowerCase());
            }
        }

        setSearchParams(newParams); 
    };

    return (
        <li className="relative border-b border-t border-[#e5e5e5]">
            <button
                onClick={() => setFlag(!flag)}
                className="flex cursor-pointer text-[#00174f] py-5 items-center w-full justify-between">
                <p>{txt}</p>
                <FaAngleDown className={`transform duration-300 ${flag ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
                ref={contentRef}
                style={{
                    maxHeight: height,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
                className="duration-300">
                {priceFlag && (
                    <div className="px-8 pt-10">
                        <InputRange />
                    </div>
                )}
                <ul>
                    {data &&
                        data.map((item: GeneralCategory, i: number) => (
                            <li key={i} className="flex mb-4 items-center cursor-pointer">
                                <input
                                    onChange={() => handleChange(item.name)} 
                                    className="input-active"
                                    type="checkbox"
                                    checked={selectedValue === item.name} // Sadece seçili olan checkbox işaretlenir
                                />
                                <p className="text-[14px] text-[#484848] pl-4">{item.name}</p>
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    );
}

export default FilterList;
