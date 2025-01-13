import { TQueryParam } from "../../../Types/global";
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

        getAllPaymentRequest: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/paymentRequest`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['requestpayment']
        }),

        approvePaymentRequest: builder.mutation({
            query: ({ id }) => {
                console.log("Updating payment request status with id:", id);
                return {
                    url: `/paymentRequest/${id}/approve`,  // Ensure this path matches your backend route
                    method: 'PATCH',
                    body: {},  // Send the necessary body data (if any)
                };
            },
            invalidatesTags: ['requestpayment'],
        }),


        rejectPaymentRequest: builder.mutation({
            query: ({ id }) => {
                console.log("Rejecting payment request status with id:", id);
                return {
                    url: `/paymentRequest/${id}/reject`,  // Ensure this path matches your backend route
                    method: 'PATCH',
                    body: {},  // Send the necessary body data (if any)
                };
            },
            invalidatesTags: ['requestpayment'],
        }),


    })
});

export const {
    useCreatePaymentRequestMutation,
    useGetAllPaymentRequestQuery,
    useApprovePaymentRequestMutation,
    useRejectPaymentRequestMutation,
} = paymentrequestApi;