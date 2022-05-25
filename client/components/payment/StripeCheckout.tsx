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
import {
  useAppSelector,
  selectCouponInfo,
  SETCART,
  SET_TOTAL,
  useAppDispatch,
  SET_COUPON,
  SET_USER_CART_COUNT,
} from '@store';
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
  const [__, orderAPI] = useApi({
    method: 'post',
    url: '/orders',
  });
  const [___, cartAPI] = useApi({
    method: 'delete',
    url: '/cart',
  });
  const dispatch = useAppDispatch();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState('');
  const couponInfo = useAppSelector(selectCouponInfo);

  useEffect(() => {
    setIsLoading(false);
    setDisabled(false);
    setSuccess(false);
    setError('');
    setClientSecret('');
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
      //create order and save in database

      await orderAPI({
        body: {
          stripeResponse: payload?.paymentIntent,
        },
      });
      await cartAPI({});

      dispatch(SETCART([]));
      dispatch(SET_TOTAL(0));
      dispatch(
        SET_COUPON({
          couponApplied: false,
          couponName: '',
          discountedPrice: 0,
          originalPrice: 0,
        })
      );
    }
    dispatch(SET_USER_CART_COUNT(0));
    setError('');
    setIsLoading(false);
    setSuccess(true);
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
