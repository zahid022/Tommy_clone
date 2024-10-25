import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CartAddType, Category, CreateAccountValues, Filters, FooterLinks, GeneralCategory, ProductType, PromoCodeType, Sub, SubCategory, UserType } from '../types/Type'

export const Api = createApi({
    reducerPath: 'carsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        footerLinks: builder.query<Array<FooterLinks>, void>({
            query: () => ({
                url: `/footerLinks`
            })
        }),
        allCategory: builder.query<Array<Category>, void>({
            query: () => ({
                url: `/category`
            })
        }),
        getCategoryById: builder.query({
            query: (id: string) => ({
                url: `/category?id=${id}`
            })
        }),
        createAccountPost: builder.mutation<CreateAccountValues, Partial<CreateAccountValues>>({    
            query: (obj: Partial<CreateAccountValues>) => ({
                url: `/user`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: obj
            })
        }),
        allUser: builder.query<Array<CreateAccountValues>, void>({
            query: () => ({
                url: `/user`
            })
        }),
        allSubCategoryById: builder.query<Array<Sub>, string>({
            query: (id: string) => ({
                url: `/sub?categoryId=${id}`
            })
        }),
        allSubById: builder.query<Array<SubCategory>, string>({
            query: (id: string) => ({
                url: `/subcategory?subId=${id}`
            })
        }),
        allGeneralCategory: builder.query<Array<GeneralCategory>, void>({
            query: () => ({
                url: `/generalcategory`
            })
        }),
        allColor: builder.query<Array<GeneralCategory>, void>({
            query: () => ({
                url: `/color`
            })
        }),
        allSize: builder.query<Array<GeneralCategory>, void>({
            query: () => ({
                url: `/size`
            })
        }),
        filterProduct: builder.query<Array<ProductType>, Filters>({
            query: (filters : Filters) => {
                const { category, subCategory, generalCategory } = filters;
                let queryStr = `products?`;

                if (category) queryStr += `categoryName=${category}&`;
                if (subCategory) queryStr += `subcategoryName=${subCategory}&`;
                if (generalCategory) queryStr += `generalcategoryName=${generalCategory}`;

                return queryStr;
            },
        }),
        getByIdProduct : builder.query<ProductType, string>({
            query : (id : string) => ({
                url : `/products/${id}`
            })
        }),
        editCart : builder.mutation<UserType, CartAddType>({
            query : (object : CartAddType) => ({
                url : `/user/${object.id}`,
                method : "PATCH",
                body : {cart : object.arr}
            })
        }),
        allPromoCode : builder.query<PromoCodeType[], void>({
            query : () => ({
                url : `/code`
            })
        })
    })
})

export const {
    useFooterLinksQuery,
    useAllCategoryQuery,
    useCreateAccountPostMutation,
    useAllUserQuery,
    useAllSubCategoryByIdQuery,
    useGetCategoryByIdQuery,
    useAllGeneralCategoryQuery,
    useAllColorQuery,
    useAllSizeQuery,
    useFilterProductQuery,
    useGetByIdProductQuery,
    useAllPromoCodeQuery,
    useEditCartMutation,
    useAllSubByIdQuery } = Api