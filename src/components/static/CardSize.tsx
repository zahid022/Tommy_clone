interface CardSizeType {
    item: string;
    setSize: (value: string) => void;
    size: string;
}

function CardSize({ item, setSize, size }: CardSizeType) {
    return (
        <div
        style={{
            backgroundColor : size === item ? '#cc0c2f' : '',
            borderColor : size === item ? '#cc0c2f' : '',
            color : size === item ? '#fff' : '',
        }}
        onClick={() => setSize(item)} className="text-[14px] uppercase tracking-widest text-[#00174f] hover:border-[#cc0c2f] hover:text-white hover:bg-[#cc0c2f] border border-[#00174f] flex h-12 w-20 cursor-pointer justify-center items-center" >{item}</div>
    )
}

export default CardSize