import { useNavigate } from "react-router-dom"

function HomeBtn({ txt, color, path }: any) {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => {
                navigate({
                    pathname: 'products',
                    search: path
                }, { replace: true });
            }}
            style={{
                textDecorationColor: color,
                textUnderlineOffset: '12px',
                textDecorationThickness: '1px'
            }}
            className='block h-9 md:text-[22px] text-[14px] sm:text-[16px] underline'>{txt}</button>
    )
}

export default HomeBtn