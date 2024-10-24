import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

function SocialIcns() {
    return (
        <div className="flex gap-8 text-[#00174f] mt-3">
            <button className="text-[1.3em]">
                <FaXTwitter />
            </button>
            <button className="text-[1.3em]">
                <FaFacebookF />
            </button>
            <button className="text-[1.3em]">
                <FaInstagram />
            </button>
            <button className="text-[1.3em]">
                <FaPinterest />
            </button>
            <button className="text-[1.3em]">
                <FaYoutube />
            </button>
        </div>
    )
}

export default SocialIcns