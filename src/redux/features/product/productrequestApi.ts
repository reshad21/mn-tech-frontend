import { TQueryParam } from "../../../Types/global";
import { baseApi } from "../../api/baseApi";

const productrequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createProductRequest: builder.mutation({
            query: (productrequestInfo) => ({
                url: '/product',
                method: 'POST',
                body: productrequestInfo,
            }),
            invalidatesTags: ['product'],
        }),

        getAllProductRequest: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/product`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['product']
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: (id) => [{ type: 'product', id }]
        }),


    })
});

export const {
    useCreateProductRequestMutation,
    useGetAllProductRequestQuery,
    useGetProductByIdQuery,
} = productrequestApi;