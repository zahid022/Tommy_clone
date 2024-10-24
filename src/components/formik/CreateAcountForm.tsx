import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CreateAccountValues } from '../../types/Type';
import { FaCheck, FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useCreateAccountPostMutation } from '../../store/Api';
import generateToken from '../../service/GenerateToken';
import { toast, ToastContainer } from 'react-toastify';

function CreateAcountForm() {
    const [flag, setFlag] = useState<boolean>(false)
    const [check, setCheck] = useState<boolean>(true)

    const [createAccountPost, {isSuccess, data}] = useCreateAccountPostMutation()

    useEffect(() => {
        if(isSuccess){
            toast.success("Uğurla qeydiyyatdan keçdiniz.", {
                autoClose : 1000
            })
            localStorage.setItem("user", JSON.stringify(data))
            localStorage.setItem("token", JSON.stringify(data.token))
        }
    }, [isSuccess])


    const initialValues: CreateAccountValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    return (
        <Formik<CreateAccountValues>
            initialValues={initialValues}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .required('First Name is required')
                    .min(2, 'First Name must be at least 2 characters')
                    .max(50, 'First Name must be 50 characters or less'),
                lastName: Yup.string()
                    .required('Last Name is required')
                    .min(2, 'Last Name must be at least 2 characters')
                    .max(50, 'Last Name must be 50 characters or less'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('Password is required')
            })}
            onSubmit={(values) => {
                let obj : CreateAccountValues = {
                    firstName : values.firstName,
                    lastName : values.lastName,
                    email : values.email,
                    password : values.password,
                    token : generateToken(),
                    role : "USER",
                    cart : []
                }
                createAccountPost(obj)
            }}
        >
            {() => (
                <Form>
                    <div className="mb-5 flex flex-wrap">
                        <div className='relative w-full mb-4'>
                            <Field
                                type="text"
                                className='pt-5 pr-3 pb-[6px] text-[16px] pl-4 rounded-[3px] border outline-none h-14 border-[#00174f] inset-0 block w-full peer'
                                name='firstName'
                                required
                            />
                            <label
                                htmlFor="firstName"
                                className='absolute top-4 left-4 text-[16px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                                First Name*
                            </label>
                            <ErrorMessage className="text-red-500 pl-4 text-[0.75em]"
                                name="firstName"
                                component="div" />
                        </div>
                        <div className='relative w-full mb-4'>
                            <Field
                                type="text"
                                className='pt-5 pr-3 pb-[6px] text-[16px] pl-4 rounded-[3px] border outline-none h-14 border-[#00174f] inset-0 block w-full peer'
                                name='lastName'
                                required
                            />
                            <label
                                htmlFor="lastName"
                                className='absolute top-4 left-4 text-[16px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                                Last Name*
                            </label>
                            <ErrorMessage className="text-red-500 pl-4 text-[0.75em]"
                                name="lastName"
                                component="div" />
                        </div>
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
                        <div className='flex flex-wrap mb-4 gap-3' onClick={() => setCheck(!check)}>
                            <div className={`${check ? 'bg-[#00174f] border border-[#00174f]' : 'bg-white border border-[#cc0c2f]'} h-5 w-5 flex justify-center items-center rounded-sm`}>
                                {check && <FaCheck className='text-white text-[12px]' />}
                            </div>
                            <p className='text-[14px] text-[#00174f] leading-5 max-w-[547px] w-[90%]'>I would like to receive updates on the latest products and promotions via email or other channels. See Privacy Policy , which includes our Notice of Financial Incentive and the Terms and Conditions , for more information.</p>
                        </div>
                        <div className='w-full'>
                            <button className='w-full flex rounded-[3px] justify-center items-center py-3 px-8 bg-[#00174f] text-white ' type="submit">Create Account</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateAcountForm;
