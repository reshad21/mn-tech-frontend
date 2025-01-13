import { baseApi } from "../../api/baseApi";

const paymentrequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentRequest: builder.mutation({
            query: (paymentrequestInfo) => ({
                url: '/paymentRequest',
                method: 'POST',
                body: paymentrequestInfo,
            }),
        }),
    })
});

export const {
    useCreatePaymentRequestMutation,
} = paymentrequestApi;