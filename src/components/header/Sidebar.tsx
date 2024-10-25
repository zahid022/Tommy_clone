import { FaArrowLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAllCategoryQuery, useAllSubCategoryByIdQuery, useGetCategoryByIdQuery } from "../../store/Api";
import { Category, Sub } from "../../types/Type";
import { useEffect, useState } from "react";

export interface SidebarType {
    sidebarFlag: boolean;
    setSidebarFlag: (value: boolean) => void;
}

function Sidebar({ sidebarFlag, setSidebarFlag }: SidebarType) {

    const navigate = useNavigate()

    function handleCloseSidebar() {
        setSidebarFlag(!sidebarFlag)
    }

    const [flag, setFlag] = useState<boolean>(false)
    const [subCategoryId, setSubCategoryId] = useState<string | null>(null)

    const { data, isLoading } = useAllCategoryQuery()

    useEffect(() => {
        if (sidebarFlag) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sidebarFlag]);

    const { data: subData, isLoading: subIsLoading } = useAllSubCategoryByIdQuery(subCategoryId as string, { skip: subCategoryId === null });

    const { data: categoryByIdData, isLoading: imgLoad } = useGetCategoryByIdQuery(subCategoryId as string, { skip: subCategoryId === null })

    function chooseCategory(id: string) {
        setSubCategoryId(id)
        setFlag(!flag)
    }

    function handleChooseSub(name: string) {
        navigate({
            pathname: 'products',
            search: `?category=${name.toLowerCase()}`
        }, { replace: true });
        setSidebarFlag(!sidebarFlag)
    }

    return (
        <div
            style={{
                visibility: sidebarFlag ? 'visible' : 'hidden'
            }}
            className={`${sidebarFlag ? 'translate-x-0' : 'translate-x-[300%]'} bg-white lg:!hidden duration-300 fixed inset-0 z-[999]`}>
            <div className="h-screen overflow-y-auto scrollbar-hide">
                {flag ?
                    <div>
                        <div className="flex relative justify-between py-3 px-4 items-center">
                            <button onClick={() => setFlag(!flag)}>
                                <FaArrowLeft className="text-[#00174f]" />
                            </button>
                            <p className="font-semibold text-[18px] text-[#00174f]">
                                {!imgLoad && categoryByIdData[0].name}
                            </p>
                            <button onClick={handleCloseSidebar}>
                                <FaXmark className="text-[1.2em] text-[#00174f]" />
                            </button>
                        </div>
                        <ul className="px-4 py-3">
                            {!subIsLoading && subData &&
                                subData.map((item: Sub, i: number) => {
                                    return <li
                                        onClick={() => handleChooseSub(categoryByIdData[0].name)}
                                        className="mb-4 cursor-pointer flex text-[14px] text-[#00174f] justify-between items-center" key={i}>
                                        <span>{item.name}</span>
                                        <span>
                                            <FaChevronRight className="text-[12px]" />
                                        </span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    :
                    <div>
                        <div className="flex relative justify-center py-3 items-center">
                            <Link onClick={handleCloseSidebar} to={`/en`}>
                                <svg
                                    width={28}
                                    height={18}
                                    viewBox="0 0 20 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M27.4286 13.5H0V4.5H27.4286V13.5Z"
                                        fill="white"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M27.4286 13.5H13.7144V4.5H27.4286V13.5Z"
                                        fill="#E31937"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 18H27.4286V13.5H0V18Z"
                                        fill="#00285D"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 4.5H27.4286V0H0V4.5Z"
                                        fill="#00285D"
                                    />
                                </svg>
                            </Link>
                            <button onClick={handleCloseSidebar} className="absolute top-3 right-4">
                                <FaXmark className="text-[1.2em] text-[#00174f]" />
                            </button>
                        </div>
                        <div className="px-4 pt-6">
                            <ul>
                                {!isLoading && data &&
                                    data.map((item: Category, i: number) => {
                                        return <li className="mb-4" key={i}>
                                            <div
                                                onClick={() => chooseCategory(item.id)}
                                                className="flex cursor-pointer text-[#00174f] text-[14px] justify-between items-center">
                                                <span>{item.name}</span>
                                                <span>
                                                    <FaChevronRight className="text-[12px]" />
                                                </span>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="px-4 py-6 mb-4">
                            <div className="h-[2px] bg-[#d3d3d3] w-5"></div>
                        </div>
                        <div className="pb-6 px-4">
                            <ul className="text-[14px] text-[#00174f]">
                                <li className="mb-4 cursor-pointer">Sign In</li>
                                <li className="cursor-pointer">Create Account</li>
                            </ul>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Sidebar