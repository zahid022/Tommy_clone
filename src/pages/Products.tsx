import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSelect from '../components/filter/FilterSelect';
import FilterSide from '../components/filter/FilterSide';
import { useAppSelector } from '../store/Hooks';
import { Filters, ProductType } from '../types/Type';
import { useFilterProductQuery } from '../store/Api';
import ProductCard from '../components/product/ProductCard';
import QuickSide from '../components/product/QuickSide';
import { useDispatch } from 'react-redux';
import { setColor, setSize } from '../store/FilterSlice';

const Products: React.FC = () => {
    const arr = ["Category", "Size", "Color", "Price", "All Filters"];

    const dispatch = useDispatch()
    const [flag, setFlag] = useState<boolean>(false);
    const [DATA, SetDATA] = useState<ProductType[] | undefined>(undefined);
    const [quickFlag, setQuickFlag] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const { priceRange, size, color } = useAppSelector((state) => state.filter);
    let filteredData = null;

    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<Filters>({
        category: searchParams.get('category') || '',
        subCategory: searchParams.get('subCategory') || '',
        generalCategory: searchParams.get('generalCategory') || ''
    });

    useEffect(() => {
        const newParams = {
            category: searchParams.get('category') || '',
            subCategory: searchParams.get('subCategory') || '',
            generalCategory: searchParams.get('generalCategory') || ''
        };
        setFilters(newParams);
        dispatch(setSize(searchParams.get('size') || ''))
        dispatch(setColor(searchParams.get('color') || ''))

    }, [searchParams]);

    const { data, isLoading } = useFilterProductQuery(filters);

    useEffect(() => {
        if (!isLoading && data) {
            filteredData = data;

            if (color) {
                filteredData = filteredData.filter((item) =>
                    item.color?.some((itemColor) => itemColor === color)
                );
            }

            if (size) {
                filteredData = filteredData.filter((item) =>
                    item.size?.some((itemSize) => itemSize === size)
                );
            }

            if(priceRange){
                filteredData = filteredData.filter((item) => 
                    (+item.price - +item.discount) < priceRange[1] && (+item.price - +item.discount) > priceRange[0]
                )
            }

            SetDATA(filteredData); 
        }
    }, [data, isLoading, color, size, priceRange]); 

    return (
        <main>
            <QuickSide id={id} quickFlag={quickFlag} setQuickFlag={setQuickFlag} />
            <FilterSide flag={flag} setFlag={setFlag} />
            <div className="wrapper">
                <div>
                    <h2 className="mb-4 capitalize text-[#00174f] text-[22px] font-semibold">
                        {filters.subCategory ? filters.subCategory : filters.category}
                    </h2>
                </div>
                <div>
                    <div className="hidden md:block">
                        <div className="flex gap-4">
                            {arr.map((item: string, i: number) => (
                                <FilterSelect setFlag={setFlag} txt={item} icon={i === arr.length - 1} key={i} />
                            ))}
                        </div>
                    </div>
                    <div className="flex md:hidden justify-end">
                        <button onClick={() => setFlag(true)} className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M3 7H6M6 7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4C7.34315 4 6 5.34315 6 7ZM3 17H9M18 17H21M18 17C18 18.6569 16.6569 20 15 20C13.3431 20 12 18.6569 12 17C12 15.3431 13.3431 14 15 14C16.6569 14 18 15.3431 18 17ZM15 7H21"
                                    stroke="#00174f"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <p className="text-[#00174f] text-[14px] font-medium">Filter & Sort</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                {!isLoading &&
                    DATA?.map((item: ProductType, i: number) => (
                        <div key={i} className="w-6/12 md:w-3/12 mb-8 px-1">
                            <ProductCard flag={true} setId={setId} setQuickFlag={setQuickFlag} item={item} />
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default Products;
