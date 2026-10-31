import CheckoutForm from '../checkoutForm'
import { getcart } from '../../_components/Api/actions/getCart/getcart'

type props = {
  params: {
    CartID: string
  }
}

export default async function page(props: props) {
  console.log("props.....",props);
  
  const params = await props.params
  const { CartID } = params
  console.log("cartId(params..)",CartID)

  let cartData;
  try {
    cartData = await getcart();
  } catch (error) {
    console.log("Failed to fetch cart data", error);
  }

  return (
    <>
      <CheckoutForm cartId={CartID} data={cartData} />
    </>
  )
}
