import Subtitle from "../../../Components/Subtitle/Subtitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// Todo:: add publisable key
/**
 * @see https://stripe.com/docs/elements
 */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
  return (
    <div>
      <Subtitle heading="Payment" subheading="Please pay to eat" />
      <div className="text-4xl">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
