import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CreateAccountValues, SignInValues } from '../../types/Type';
import { FaEye } from 'react-icons/fa';
import {useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface signData {
    data: CreateAccountValues[]
    isLoading: boolean
}

function SignInFormik({ data, isLoading }: signData) {

    const [flag, setFlag] = useState<boolean>(false)

    const [user, setUser] = useState<CreateAccountValues | undefined>(undefined);

    const initialValues: SignInValues = {
        email: '',
        password: ''
    };

    return (
        <Formik<SignInValues>
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('Password is required')
            })}
            onSubmit={(values) => {
                if (!isLoading) {
                    const newData = (data.find((item: CreateAccountValues) => item.email === values.email && item.password === values.password))
                    if (newData) {
                        setUser(newData)
                        localStorage.setItem("user", JSON.stringify(newData))
                        localStorage.setItem("token", JSON.stringify(newData.token))
                        location.reload()
                    }else{
                        toast.error("Səhv email və ya password")
                    }
                }
            }}
        >
            {() => (
                <Form>
                    <ToastContainer />
                    <div className="mb-5 flex flex-wrap">
                        <div className='relative w-full mb-4'>
                            <Field
                                type="text"
                                className='pt-5 pr-3 pb-[6px] text-[16px] pl-4 rounded-[3px] border outline-none h-14 border-[#00174f] inset-0 block w-full peer'
                                name='email'
                                required
                            />
                            <label
                                htmlFor="email"
                                className='absolute top-4 left-4 text-[16px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                                Email*
                            </label>
                            <ErrorMessage className="text-red-500 pl-4 text-[0.75em]"
                                name="email"
                                component="div" />
                        </div>
                        <div className='relative w-full mb-4'>
                            <Field
                                type={flag ? 'text' : 'password'}
                                className='pt-5 pr-3 pb-[6px] text-[16px] pl-4 rounded-[3px] border outline-none h-14 border-[#00174f] inset-0 block w-full peer'
                                name='password'
                                required
                            />
                            <label
                                htmlFor="password"
                                className='absolute top-4 left-4 text-[16px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                                Create a Password*
                            </label>
                            <button type='button' onClick={() => setFlag(!flag)} className='absolute top-[50%] z-10 right-5 translate-y-[-50%]'>
                                <FaEye className='text-[#00174f]' />
                            </button>
                            <ErrorMessage className="text-red-500 pl-4 text-[0.75em]"
                                name="password"
                                component="div" />
                        </div>
                        <div className='w-full'>
                            <button className='w-full flex rounded-[3px] justify-center items-center py-3 px-8 bg-[#00174f] text-white ' type="submit">Sign In</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default SignInFormik;
