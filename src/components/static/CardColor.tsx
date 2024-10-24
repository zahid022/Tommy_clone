interface CardColorType {
    item: string;
    setColor: (value: string) => void ;
    color : string | undefined;
}

function CardColor({ item , setColor, color}: CardColorType) {
  return (
    <div 
    onClick={() => setColor?.(item)}
    className={`cursor-pointer w-5 h-5 flex justify-center items-center mr-2 border rounded-full ${item === color ? `border-${item}-500` : ' border-white'}`}>
        <div 
        className={`bg-${item}-500 w-3 h-3 rounded-full`}></div>
    </div>
  );
}

export default CardColor;
