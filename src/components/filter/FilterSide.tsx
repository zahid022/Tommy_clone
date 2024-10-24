import useWindowWidth from "../static/useWindowWidth ";
import { FaXmark } from "react-icons/fa6";
import { useAllColorQuery, useAllGeneralCategoryQuery, useAllSizeQuery } from "../../store/Api";
import { useEffect, useState } from "react";
import FilterList from "./FilterList";

interface filterSideType {
    setFlag: (value: boolean) => void;
    flag: boolean;
}


function  FilterSide({ flag, setFlag }: filterSideType) {
    const width = useWindowWidth()
    const [classFilter, setClassFilter] = useState<string>('')

    const { data: category, isLoading: categoryLoad } = useAllGeneralCategoryQuery()
    const {data : color, isLoading : colorLoad} = useAllColorQuery()
    const {data : size, isLoading : sizeLoad} = useAllSizeQuery()

    useEffect(() => {
        if (width <= 768) {
            if (flag) {
                setClassFilter('translate-y-0');
            } else {
                setClassFilter('translate-y-[300%]');
            }
        } else {
            if (flag) {
                setClassFilter('translate-x-0');
            } else {
                setClassFilter('translate-x-[300%]');
            }
        }
    }, [width, flag]);

    return (
        <div
            style={{
                visibility: flag ? 'visible' : 'hidden'
            }}
            className={`${flag ? 'z-[999] opacity-[1]' : '-z-[1] opacity-0'} ${classFilter} fixed duration-300 bg-[#00000080] inset-0`}>
            <div className="relative h-full w-full">
                <div className={`bg-white absolute top-0 ${(width <= 768 ? 'w-full' : "min-w-[542px]" )} bottom-0 right-0`}>
                    <div className={`flex sticky items-center z-[999] ${(width <= 768 ? 'w-full' : "min-w-[542px]" )} justify-between top-0 right-0  p-10`}>
                        <p className="text-[#00174f]">Filter</p>
                        <button onClick={() => setFlag(false)} className="bg-[#f9fafb] rounded-full p-2">
                            <FaXmark className="text-[16px] text-[#00174f]" />
                        </button>
                    </div>
                    <div className="px-10 overflow-y-auto scrollbar-hide pb-56 h-screen">
                        <ul>
                            <FilterList txt="Category" data={categoryLoad ? undefined : category} />
                            <FilterList txt="Color" data={colorLoad ? undefined : color} />
                            <FilterList txt="Size" data={sizeLoad ? undefined : size} />
                            <FilterList txt="Price" priceFlag={true} />
                        </ul>
                    </div>
                    <div className={`justify-between fixed bottom-0 z-[999] bg-white right-0 ${(width <= 768 ? 'w-full' : "min-w-[542px]" )} px-10 py-6 border-t border-[#e5e5e5] flex`}>
                        <button className="p-4 text-[14px] max-w-[200px] hover:border-[#707070] w-full rounded-[3px] flex justify-center text-[#00174f] border border-[#e5e5e5] items-center">Clear All</button>
                        <button className="p-4 text-[14px] max-w-[200px] hover:bg-[#01123e] hover:underline w-full rounded-[3px] flex justify-center bg-[#00174f] text-white border border-[#00174f] items-center">View 876 Items</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSide