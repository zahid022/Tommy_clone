import { Link } from "react-router-dom"
import { FooterLinks } from "../../types/Type"
import SocialIcns from "../static/SocialIcns"

interface footerType {
    item: FooterLinks,
    i: number
}

function FooterList({ item, i }: footerType) {
    return (
        <div>
            <h2 className="text-[#00174f] text-[12px] mb-2">{item.name}</h2>
            <ul>{item.links.map((item: string, i: number) => (
                <li className="text-[14px] text-[#00174f] mb-1 pt-1 mt-[2px]" key={i}>
                    <div className="inline-block footer-list">
                        <Link to={'/'}>
                            {item}
                        </Link>
                        <div className="h-[1px] duration-300 mt-1 bg-[#00174f] rounded-sm w-0"></div>
                    </div>
                </li>
            ))}
            </ul>
            {i === 3 &&
                <SocialIcns />
            }
        </div>
    )
}

export default FooterList