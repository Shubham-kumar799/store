//components
import { PaymentSuccessful, StripeCheckout } from '@components/payment';

//types
import { NextPage } from 'next';
import { Heading, VStack } from '@chakra-ui/react';

//utils
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//@ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const Payment: NextPage = () => {
  const [success, setSuccess] = useState(false);
  return (
    <>
      {success ? (
        <PaymentSuccessful />
      ) : (
        <VStack spacing="4">
          <Elements stripe={stripePromise}>
            <Heading>Complete your order</Heading>
            <StripeCheckout success={success} setSuccess={setSuccess} />
          </Elements>
        </VStack>
      )}
    </>
  );
};

export default Payment;
