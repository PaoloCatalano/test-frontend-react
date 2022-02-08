import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import "../Stripe.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51JRxHGF17QD9BE8bAWZT6DkhashaTufvvh3JCvia7OVILCzkGohRIqBQIh8aWJOPO4ApxdEtxUauqObcwOSOKjw6003h8NdWrd"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`https://e-commerce-tutorial.herokuapp.com/api/v1/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tax: 499,
        shippingFee: 799,
        items: [
          {
            name: "chair",
            price: 2999,
            image: "/uploads/example.jpeg",
            amount: 1,
            product: "61d338f4e4415541ffa7efba",
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
