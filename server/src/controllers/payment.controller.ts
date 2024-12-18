import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { createPaymentStripe, successPaymentStripe } from "../services/payment.service";
import { INTERNAL_SERVER_ERROR, OK } from "../constants/http";

// prefix: /payment
export const checkoutStripeHandler = catchErrors(async (req, res) => {
    const { userData, paymentData } = req.body;
    const sessionUrl = await createPaymentStripe(userData, paymentData);
    appAssert(sessionUrl, INTERNAL_SERVER_ERROR, "Session not created");

    return res.status(OK).json({
        data: sessionUrl
    })
})

export const successStripeHandler = catchErrors(async (req, res) => {
    const body = req.body
    const signature = req.headers['stripe-signature'];
    const success = await successPaymentStripe(body, signature);
    if (success === true) {
        return res.status(OK).json({
            message: "Payment success"
        })
    }
})
