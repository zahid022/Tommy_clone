import { useState } from "react"
import { FaMinus, FaPlus} from "react-icons/fa"
import { FooterLinks } from "../../types/Type"
import SocialIcns from "../static/SocialIcns"

interface footerType {
    item: FooterLinks,
    i: number
}

function FooterAccordion({ item, i }: footerType) {
    const [flag, setFlag] = useState(false)

    return (
        <div>
            <button
                onClick={() => setFlag(!flag)}
                className={`${i === 0 ? '' : 'border-t border-[#00174f]'} py-5 flex w-full justify-between items-center capitalize text-[#00174f] text-[14px]`}>
                <span>{item.name}</span>
                {flag ? <FaMinus /> : <FaPlus />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${flag ? 'max-h-[500px]' : 'max-h-0'}`}>
                <ul>
                    {item.links.map((link: string, i: number) => (
                        <li className="mt-1 mb-3 pt-2 text-[14px] text-[#00174f]" key={i}>
                            {link}
                        </li>
                    ))}
                </ul>
            </div>
            {i === 3 &&
                <SocialIcns />
            }
        </div>
    )
}

export default FooterAccordion
