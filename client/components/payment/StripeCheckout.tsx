//components
import { CardElement } from '@stripe/react-stripe-js';
import { Button, VStack, Text } from '@chakra-ui/react';
import PaymentSuccessful from './PaymentSuccessful';

//types
import { Dispatch, FC, FormEvent } from 'react';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';

//utils
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useAppSelector, selectCouponInfo } from '@store';
import { useApi } from '@hooks';

interface Props {
  success: boolean;
  setSuccess: Dispatch<boolean>;
}

const StripeCheckout: FC<Props> = ({ success, setSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [_, API] = useApi({
    method: 'post',
    url: '/payment/create-payment-intent',
  });
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState('');
  const couponInfo = useAppSelector(selectCouponInfo);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const data = await API({
        body: { couponApplied: couponInfo.couponApplied },
      });
      //@ts-ignore
      setClientSecret(data.payload);
    };
    createPaymentIntent();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        //@ts-ignore
        card: elements?.getElement(CardElement),
        billing_details: {
          //@ts-ignore
          name: e.target.name.value,
        },
      },
    });

    if (payload?.error) {
      setError(`Payment failed ${payload.error.message}`);
    } else {
      setSuccess(true);
      setError('');
      //create order and save in database
    }
    setIsLoading(false);
  };

  const handleChange = async (e: StripeCardElementChangeEvent) => {
    setDisabled(e.empty);

    setError(e.error ? e.error.message : '');
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {success ? (
        <PaymentSuccessful />
      ) : (
        <VStack>
          <form
            id="payment-form"
            onSubmit={e => handleSubmit(e)}
            className="stripe-form"
          >
            <CardElement
              options={cartStyle}
              id="cart-element"
              onChange={e => handleChange(e)}
            />
            <Button
              type="submit"
              w="full"
              mt={4}
              colorScheme="brand.primary"
              isDisabled={disabled}
              isLoading={isLoading}
            >
              Pay
            </Button>
          </form>
          {error && (
            <Text fontWeight={'bold'} color={'brand.secondary.500'}>
              {error}
            </Text>
          )}
        </VStack>
      )}
    </>
  );
};

export default StripeCheckout;
