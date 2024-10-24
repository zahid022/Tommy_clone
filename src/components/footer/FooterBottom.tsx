import { useFooterLinksQuery } from "../../store/Api"
import { FooterLinks } from "../../types/Type"
import FooterAccordion from "./FooterAccordion"
import FooterList from "./FooterList"

function FooterBottom() {

  const { data, isLoading } = useFooterLinksQuery()

  return (
    <div className="wrapper">
      <div className="border-t lg:py-10 border-[#00174f]">
        <div className="lg:hidden">
          {!isLoading &&
            data && data.map((item: FooterLinks, i: number) => (
              <FooterAccordion i={i} item={item} key={i} />
            ))
          }
        </div>
        <div className="hidden lg:flex">
          {
            !isLoading &&
            data && data.map((item: FooterLinks, i: number) => (
              <div key={i} className="w-3/12">
                <FooterList item={item} i={i} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="my-5">
        <p className="text-[12px] text-[#00174f] font-medium">© 2024 Tommy Hilfiger licensing, LLC. All rights reserved.</p>
      </div>
    </div>
  )
}

export default FooterBottom