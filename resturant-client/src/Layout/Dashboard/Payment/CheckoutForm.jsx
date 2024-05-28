import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const [clientSecret, setClientSecret] = useState("");
  const { cartInfo } = useCart();
  const totalPrice = cartInfo.reduce((sum, item) => sum + item.price, 0);

  // Get client secret from backend
  useEffect(() => {
   if(totalPrice){
    const getCLientSecret = async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: totalPrice,
      });
      console.log(data.clientSecret);
      setClientSecret(data.clientSecret);
    };
    getCLientSecret();
   }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (paymentError) {
      console.log(paymentError);
    } else {
      console.log("payment success", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const paymentInfo = {
          email: user?.email,
          price: totalPrice,
          date: new Date(),
          cartIds: cartInfo.map((item) => item._id),
          menuItems: cartInfo.map((item) => item.cartId),
          status: "pending",
          transactionId: paymentIntent.id,
        };
        const res = await axiosSecure.post("/payments", paymentInfo);
        console.log(res.data);
        // if (res.data.insertedId) {
        //   toast.success("Payment successful");
        //   //   refetch();
        // }
      }
    }
  };
  return (
    <div className="w-1/2">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="btn btn-sm"
        >
          Pay
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
