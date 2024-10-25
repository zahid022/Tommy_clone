import { useEffect, useState } from "react";
import { useAllCategoryQuery, useAllSubCategoryByIdQuery, useGetCategoryByIdQuery } from "../../store/Api";
import { Category, Sub } from "../../types/Type";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignInSidebar from "../account/SignInSidebar";
import SubCategoryComp from "./SubCategory";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setCart } from "../../store/BasketSlice";
import { SidebarType } from "./Sidebar";

function Header({setSidebarFlag, sidebarFlag} : SidebarType) {
    const [flag, setFlag] = useState<boolean>(false)
    const location = useLocation();
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [subCategoryId, setSubCategoryId] = useState<string | null>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isMobile, setIsMobile] = useState(window.innerWidth < 992)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function handleOpenCart(){
        if(isMobile){
            navigate(`/en/cart`)
        }else{
            dispatch(setCart(true))
        }
    }

    function handleOpenSidebar(){
        setSidebarFlag(!sidebarFlag)
    }

    const token = localStorage.getItem("token")

    const user1 = localStorage.getItem("user")

    const user = user1 && JSON.parse(user1)

    const { basket } = useAppSelector(state => state.basket)

    const [dropdownPosition, setDropdownPosition] = useState<boolean>(false)

    const [hoverPosition, setHoverPosition] = useState<boolean>(false)

    const [sign, setSign] = useState<boolean>(false)

    const { data, isLoading } = useAllCategoryQuery()

    const { data: subData, isLoading: subIsLoading } = useAllSubCategoryByIdQuery(subCategoryId as string, { skip: subCategoryId === null });

    const { data: categoryByIdData, isLoading: imgLoad } = useGetCategoryByIdQuery(subCategoryId as string, { skip: subCategoryId === null })

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    const isTransparent = location.pathname === ('/en');

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleSignOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setFlag(!flag)
        window.location.reload()
    }

    return (
        <header
            onMouseLeave={() => {
                setHoverPosition(false)
                setDropdownPosition(false)
            }}
            onMouseEnter={() => {
                setHoverPosition(true)
            }}
            className={`${!isTransparent && '!bg-white !sticky'} ${hoverPosition && '!bg-white !fixed'} ${scrollPosition < 40 ? 'fixed top-0 left-0 right-0 bg-transparent' : scrollPosition < 250 ? 'fixed bg-white top-0 left-0 right-0' : 'fixed -top-36 left-0 right-0'} z-[999]`}>
            <SignInSidebar setSign={setSign} sign={sign} />
            <nav className="py-4 relative">
                <div className="wrapper">
                    <div>
                        <div className="flex justify-between lg:justify-start items-center">
                            <div className="hidden lg:block lg:w-4/12 " id="store">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={!isTransparent ? '#00174f' : hoverPosition ? '#00174f' : scrollPosition < 40 ? 'white' : '#00174f'} viewBox="0 0 384 512">
                                        <path d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 15.6 5.4 37 16.6 63.4c10.9 25.9 26.2 54 43.6 82.1c34.1 55.3 74.4 108.2 99.9 140c25.4-31.8 65.8-84.7 99.9-140c17.3-28.1 32.7-56.3 43.6-82.1C346.6 229 352 207.6 352 192zm32 0c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z" />
                                    </svg>
                                    <p className={` ${hoverPosition && '!text-[#00174f]'} ${scrollPosition < 40 ? 'text-white' : 'text-[#00174f]'} ${!isTransparent && '!text-[#00174f]'} ml-1 text-[14px]`}>Stores</p>
                                </div>
                            </div>
                            <div id="mobile-logo" className="lg:hidden">
                                <Link to={'/en'}>
                                    <svg className={`${!isTransparent && '!hidden'} ${hoverPosition && '!hidden'} ${scrollPosition < 40 ? "block" : 'hidden'}`} id="ag-mobile"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={28}
                                        height={18}
                                        viewBox="0 0 38 25"
                                        fill="none"
                                    >
                                        <g clipPath="url(#clip0_1_2)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M36.1 1.875H1.9V6.25H36.1V1.875ZM18.05 8.125H1.9V16.875H18.05V8.125ZM19.95 16.875V8.125H36.1V16.875H19.95ZM19.95 18.75H1.9V23.125H36.1V18.75H19.95ZM0 6.25V25H38V0H0V6.25Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_2">
                                                <rect width={38} height={25} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <svg className={`${!isTransparent && '!block'} ${hoverPosition && '!block'} ${scrollPosition < 40 ? "hidden" : 'block'}`} id="rengli-mobile"
                                        width={28}
                                        height={18}
                                        viewBox="0 0 28 18"
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
                            </div>
                            <div id="desktop-logo" className=" hidden lg:flex lg:w-4/12 lg:justify-center">
                                <Link to={'/en'}>
                                    <svg className={`${!isTransparent && '!hidden'} ${hoverPosition && '!hidden'} ${scrollPosition < 40 ? "block" : 'hidden'}`} id="ag-desktop"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={287}
                                        height={25}
                                        viewBox="0 0 448 25"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M20.2364 3.44554L11.8591 3.44554L11.8591 24.5412H8.38056L8.38056 3.44554H0L0 0.319659L20.2364 0.319659V3.44554Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M45.977 21.6599C51.408 21.6599 55.422 17.7165 55.422 12.4298C55.422 7.10134 51.408 3.1964 45.977 3.1964C40.5813 3.1964 36.5673 7.10134 36.5673 12.4298C36.5673 17.7165 40.5813 21.6599 45.977 21.6599ZM45.977 -3.92551e-06C53.9632 -3.92551e-06 59.0063 5.68107 59.0063 12.4298C59.0063 18.9636 54.1075 24.8563 45.9033 24.8563C37.9876 24.8563 32.983 18.9925 32.983 12.4298C32.983 5.71634 38.1319 -3.92551e-06 45.977 -3.92551e-06Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M97.9175 24.5399H94.439V5.68206H94.3684L86.9112 15.0533H86.3438L78.8897 5.68206H78.816V24.5399H75.3375V0.321586H78.6044L86.6291 10.2603L94.6858 0.321586H97.9175V24.5399Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M140.166 24.5399H136.688V5.68206H136.617L129.16 15.0533H128.592L121.135 5.68206H121.065V24.5399H117.586V0.321586H120.853L128.878 10.2603L136.935 0.321586H140.166V24.5399Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M172.509 0.320304H176.7L167.716 11.753V24.5386H164.238V11.7177L155.254 0.320304H159.445L165.94 8.66239L172.509 0.320304Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M270.828 24.5399H267.353V13.9889L253.785 13.9889V24.5399H250.306V0.321586H253.785V10.863L267.353 10.863V0.321586H270.828V24.5399Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M288.722 24.5399H285.241V0.321584H288.722V24.5399Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M306.473 21.4102H317.409V24.5392H302.995V0.320912H306.473V21.4102Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M340.323 3.44554H330.878V10.1558L340.323 10.1558V13.2784L330.878 13.2784V24.5412H327.402V0.319663H340.323V3.44554Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M355.978 24.5399H352.503V0.321584H355.978V24.5399Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M389.103 22.8654C385.868 24.2857 383.249 24.8563 379.876 24.8563C372.454 24.8563 366.985 19.669 366.985 12.5676C366.985 5.43421 372.595 -3.92551e-06 379.975 -3.92551e-06C382.819 -3.92551e-06 384.81 0.461663 388.606 2.06147V5.57207C385.769 4.01394 382.819 3.1964 379.905 3.1964C374.65 3.1964 370.572 7.20714 370.572 12.4618C370.572 17.8608 374.615 21.6599 380.37 21.6599C382.249 21.6599 383.954 21.2335 385.624 20.7013V15.7288H380.969V12.6061L389.103 12.6061V22.8654Z"
                                            fill="white"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M416.085 3.44554H405.826V10.7585L415.729 10.7585V13.8812L405.826 13.8812V21.4089H416.406V24.5412H402.344V0.319663H416.085V3.44554Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M431.779 10.8992H434.014C437.742 10.8992 438.807 8.98524 438.775 6.96224C438.733 4.68596 437.386 3.30416 434.014 3.30416H431.779V10.8992ZM434.402 0.319353C439.3 0.319353 442.356 2.91303 442.356 7.1001C442.356 9.90858 440.903 12.0021 438.31 13.0313C440.509 14.4868 441.862 16.7214 443.705 19.7415C444.738 21.4118 445.337 22.2261 447.011 24.5409H442.856L439.659 19.5619C436.463 14.5926 435.008 14.0251 433.238 14.0251H431.779V24.5409H428.297V0.319353H434.402Z"
                                            fill="white"
                                        />
                                        <g clipPath="url(#clip0_2_34)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M229.1 1.875H194.9V6.25H229.1V1.875ZM211.05 8.125H194.9V16.875H211.05V8.125ZM212.95 16.875V8.125H229.1V16.875H212.95ZM212.95 18.75H194.9V23.125H229.1V18.75H212.95ZM193 6.25V25H231V0H193V6.25Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2_34">
                                                <rect width={38} height={25} fill="white" transform="translate(193)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <svg className={`${!isTransparent && '!block'} ${hoverPosition && '!block'} ${scrollPosition < 40 ? "hidden" : 'block'}`} id="rengli-desktop"
                                        width={287}
                                        height={25}
                                        viewBox="0 0 448 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_4362_3287)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20.2364 3.44552L11.8591 3.44552L11.8591 24.5412H8.38056L8.38056 3.44552H0L0 0.319643L20.2364 0.319643V3.44552Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                d="M45.977 21.6599C51.408 21.6599 55.422 17.7165 55.422 12.4298C55.422 7.10135 51.408 3.1964 45.977 3.1964C40.5813 3.1964 36.5673 7.10135 36.5673 12.4298C36.5673 17.7165 40.5813 21.6599 45.977 21.6599ZM45.977 -3.8147e-06C53.9632 -3.8147e-06 59.0063 5.68107 59.0063 12.4298C59.0063 18.9636 54.1075 24.8563 45.9033 24.8563C37.9876 24.8563 32.983 18.9925 32.983 12.4298C32.983 5.71634 38.1319 -3.8147e-06 45.977 -3.8147e-06Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M97.9175 24.5399H94.439V5.68205H94.3684L86.9112 15.0533H86.3438L78.8897 5.68205H78.816V24.5399H75.3375V0.321569H78.6044L86.6291 10.2603L94.6858 0.321569H97.9175V24.5399Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M140.166 24.5399H136.688V5.68205H136.617L129.16 15.0533H128.592L121.135 5.68205H121.065V24.5399H117.586V0.321569H120.853L128.878 10.2603L136.935 0.321569H140.166V24.5399Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M172.509 0.320272H176.7L167.716 11.753V24.5386H164.238V11.7177L155.254 0.320272H159.445L165.94 8.66236L172.509 0.320272Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M270.828 24.5399H267.353V13.9889L253.785 13.9889V24.5399H250.306V0.321569H253.785V10.863L267.353 10.863V0.321569H270.828V24.5399Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M288.722 24.5399H285.241V0.321568H288.722V24.5399Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M306.473 21.4102H317.409V24.5393H302.995V0.320927H306.473V21.4102Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M340.323 3.44552H330.878V10.1557L340.323 10.1557V13.2784L330.878 13.2784V24.5412H327.402V0.319647H340.323V3.44552Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M355.978 24.5399H352.503V0.321568H355.978V24.5399Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M389.103 22.8654C385.868 24.2857 383.249 24.8563 379.876 24.8563C372.454 24.8563 366.985 19.669 366.985 12.5676C366.985 5.43421 372.595 -3.8147e-06 379.975 -3.8147e-06C382.819 -3.8147e-06 384.81 0.461664 388.606 2.06147V5.57207C385.769 4.01394 382.819 3.1964 379.905 3.1964C374.65 3.1964 370.572 7.20714 370.572 12.4618C370.572 17.8608 374.615 21.6599 380.37 21.6599C382.249 21.6599 383.954 21.2335 385.624 20.7013V15.7288H380.969V12.6061L389.103 12.6061V22.8654Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M416.085 3.44552H405.826V10.7585L415.729 10.7585V13.8811L405.826 13.8811V21.4089H416.406V24.5412H402.344V0.319647H416.085V3.44552Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                d="M431.779 10.8992H434.014C437.742 10.8992 438.807 8.98521 438.775 6.96221C438.733 4.68593 437.386 3.30413 434.014 3.30413H431.779V10.8992ZM434.402 0.319323C439.3 0.319323 442.356 2.913 442.356 7.10007C442.356 9.90855 440.903 12.0021 438.31 13.0312C440.509 14.4868 441.862 16.7214 443.705 19.7414C444.738 21.4118 445.337 22.2261 447.011 24.5409H442.856L439.659 19.5619C436.463 14.5926 435.008 14.0251 433.238 14.0251H431.779V24.5409H428.297V0.319323H434.402Z"
                                                fill="#00164E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M230.594 6.33606L211.973 6.33606V18.4837L230.594 18.4837V6.33606Z"
                                                fill="#E31937"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M211.973 6.37134L193.356 6.37134V18.4837L211.973 18.4837V6.37134Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M193.353 0.324763L230.594 0.324763V6.3521L193.353 6.3521V0.324763Z"
                                                fill="#00285D"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M193.353 18.4485L230.594 18.4485V24.5046L193.353 24.5046V18.4485Z"
                                                fill="#00285D"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_4362_3287">
                                                <rect width={448} height={25} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link>
                            </div>
                            <div className="flex gap-3 lg:gap-4 relative lg:w-4/12 lg:justify-end">
                                {
                                    flag && !token &&
                                    <div className="absolute w-[200px] rounded-sm z-[999] bg-[#00174F] py-5 px-6 top-[130%] right-0">
                                        <ul
                                            className="text-white">
                                            <li className="mb-2 text-[12px]">
                                                <div className="inline-block footer-list">
                                                    <button onClick={() => {
                                                        setFlag(!flag)
                                                        setSign(true)
                                                    }}>
                                                        Sign In
                                                    </button>
                                                    <div className="h-[1px] duration-300 mt-1 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[12px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Create Account
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                }
                                {
                                    flag && token &&
                                    <div className="absolute w-[200px] rounded-sm z-[999] bg-[#00174F] py-5 px-6 top-[130%] right-0">
                                        <h2 className="text-white text-[18px] font-semibold mb-2">Hi, {user.firstName}</h2>
                                        <ul
                                            className="text-white">
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Overview
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Orders
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Personal Information
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Addresses
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Payment
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block footer-list">
                                                    <Link to={'createaccount'} onClick={() => setFlag(!flag)}>
                                                        Saved Items
                                                    </Link>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                            <li className="mb-2 text-[14px]">
                                                <div className="inline-block text-[#969696] footer-list">
                                                    <button onClick={handleSignOut}>
                                                        Sign Out
                                                    </button>
                                                    <div className="h-[1px] duration-300 bg-[#fff] rounded-sm w-0"></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                }
                                <button className="px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={!isTransparent ? '#00174f' : hoverPosition ? '#00174f' : scrollPosition < 40 ? 'white' : '#00174f'} viewBox="0 0 512 512">
                                        <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1l124 124 17 17L478.1 512l-17-17-124-124z" />
                                    </svg>
                                </button>
                                <button onClick={() => setFlag(!flag)} className="px-1 hidden lg:flex lg:gap-[4px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={!isTransparent ? '#00174f' : hoverPosition ? '#00174f' : scrollPosition < 40 ? 'white' : '#00174f'} viewBox="0 0 448 512">
                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                                    </svg>
                                    <span className={`text-[14px] hover:underline ${!isTransparent ? 'text-[#00174f]' : hoverPosition ? 'text-[#00174f]' : scrollPosition < 40 ? 'text-white' : 'text-[#00174f]'}`}>{user && user.firstName}</span>
                                </button>
                                <button
                                    onClick={handleOpenCart}
                                    className="px-1 relative">
                                    <span className={`${!isTransparent ? 'text-[#00174f]' : hoverPosition ? 'text-[#00174f]' : scrollPosition < 40 ? 'text-white' : 'text-[#00174f]'} absolute text-[12px] font-medium -top-3 -right-1`}>
                                        {basket.length > 0 && basket.length}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={!isTransparent ? '#00174f' : hoverPosition ? '#00174f' : scrollPosition < 40 ? 'white' : '#00174f'} viewBox="0 0 448 512">
                                        <path d="M160 112l0 48 128 0 0-48c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-48 96l-64 0 0 208c0 26.5 21.5 48 48 48l256 0c26.5 0 48-21.5 48-48l0-208-64 0 0 56c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-56-128 0 0 56c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-56zm0-48l0-48C112 50.1 162.1 0 224 0s112 50.1 112 112l0 48 64 0c26.5 0 48 21.5 48 48l0 208c0 53-43 96-96 96L96 512c-53 0-96-43-96-96L0 208c0-26.5 21.5-48 48-48l64 0z" />
                                    </svg>
                                </button>
                                <button
                                onClick={handleOpenSidebar}
                                className="px-1 lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={!isTransparent ? '#00174f' : hoverPosition ? '#00174f' : scrollPosition < 40 ? 'white' : '#00174f'} viewBox="0 0 448 512">
                                        <path d="M0 88C0 74.7 10.7 64 24 64l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 112C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 272c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24L24 432c-13.3 0-24-10.7-24-24s10.7-24 24-24l400 0c13.3 0 24 10.7 24 24z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <nav className="hidden lg:block lg:mt-6">
                            <ul className="flex justify-center">
                                {
                                    !isLoading &&
                                    data && data.map((item: Category, i: number) => (
                                        <li
                                            key={i}
                                            onClick={() => {
                                                navigate({
                                                    pathname: 'products',
                                                    search: `?category=${item.slug}`
                                                }, { replace: true });
                                            }}
                                            onMouseEnter={() => {
                                                setDropdownPosition(true)
                                                setHoverPosition(true)
                                                setSubCategoryId(item.id)
                                            }}
                                            onMouseLeave={() => {
                                                setSubCategoryId(null)
                                            }}
                                            className={`pt-2 ${!isTransparent ? 'text-[#00174f]' : hoverPosition ? 'text-[#00174f]' : scrollPosition < 40 ? 'text-white' : 'text-[#00174f]'} hover:underline cursor-pointer capitalize px-3`}>{item.name}</li>

                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
                <div
                    style={{
                        visibility: dropdownPosition ? 'visible' : 'hidden'
                    }}
                    className={`${dropdownPosition ? "opacity-[1] z-[998]" : "opacity-0 -z-[1]"} bg-white py-10 min-h-20 duration-300 absolute top-full left-0 right-0`}>
                    <div className="flex w-11/12 gap-7 justify-center mx-auto">
                        <div>
                            {!imgLoad && categoryByIdData &&
                                <img
                                    className="h-[344px] w-[259px]"
                                    src={categoryByIdData[0].img}
                                    alt={categoryByIdData[0].name}
                                />
                            }
                        </div>
                        <div className="flex gap-8">
                            {!subIsLoading && !imgLoad &&
                                subData && subData.map((item: Sub, i: number) => (
                                    <div key={i}>
                                        <h2 className="text-[14px] mb-3 font-semibold text-[#00174f]">{item.name}</h2>
                                        <SubCategoryComp name={categoryByIdData[0].slug} id={item.id} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header