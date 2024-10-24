import { FaXmark } from "react-icons/fa6"
import SignInFormik from "../formik/SignInFormik"
import { Link } from "react-router-dom"
import { useAllUserQuery } from "../../store/Api"

interface SignInSidebarProps {
    setSign: (value: boolean) => void;
    sign: boolean;
}

function SignInSidebar({ setSign, sign }: SignInSidebarProps) {

    const {data, isLoading} = useAllUserQuery()

    return (
        <div 
        style={{
            visibility : sign ? "visible" : 'hidden'
        }}
        className={`fixed inset-0 ${sign ? 'z-[999] opacity-[1]' : 'z-[-1] opacity-0'} flex bg-[#00000080]`}>
            <div className="h-full w-full relative">
                <div className={`bg-white max-w-[500px] ${sign ? 'translate-x-0' : 'translate-x-[300%]'} duration-300 absolute p-10 h-screen right-0`}>
                    <div className="flex mb-20 justify-end">
                        <button onClick={() => setSign(false)} className="bg-[#f9fafb] rounded-full p-2">
                            <FaXmark className="text-[16px] text-[#00174f]" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-[22px] md:text-[34px] mb-4 font-semibold text-[#00174f] capitalize">Sign In</h2>
                        <SignInFormik data={!isLoading && data ? data : []} isLoading={isLoading} />
                    </div>
                    <div>
                        <p className="text-center text-[#48484] text-[14px]">
                            Don't have an account? <Link className="text-[#00174f] underline" onClick={() => setSign(false)} to={`createaccount`}>Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInSidebar