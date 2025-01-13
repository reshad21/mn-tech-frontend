import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createOrder: builder.mutation({
            query: (data) => {
                // console.log("inside base api for order=>", data);
                return {
                    url: '/order/create',
                    method: 'POST',
                    body: data,
                }
            },
        }),

    }),
});

export const { useCreateOrderMutation } = orderApi;
