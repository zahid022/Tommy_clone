import CreateAcountForm from "../components/formik/CreateAcountForm"

function PublicCreateAccount() {
  
  return (
    <main>
        <div className="wrapper">
            <div className="py-6 max-w-[416px] mx-auto">
                <div>
                    <h2 className="text-[22px] md:text-[34px] mb-4 font-semibold text-[#00174f] capitalize">Create an Account</h2>
                </div>
                <CreateAcountForm />
            </div>
        </div>
    </main>
  )
}

export default PublicCreateAccount