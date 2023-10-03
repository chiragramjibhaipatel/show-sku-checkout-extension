import {
  reactExtension,
  Text,
  useApi,
  useTarget,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

function Extension() {
  const {
    merchandise: { id, selectedOptions, product },
  } = useTarget();
  const [sku, setSku] = useState()
  const {query} = useApi();

  useEffect(() => {
    query(
      `query ($productId: ID!, $selectedOptions: [SelectedOptionInput!]!) {
        product(id: $productId) {
          variantBySelectedOptions(selectedOptions: $selectedOptions) {
            sku
          }
        }
      }`,
      { variables: { productId: product.id, selectedOptions: selectedOptions } }
    )
    .then(data => {
      setSku(data.data.product.variantBySelectedOptions.sku);
    });
  }, [query])
  return <Text>SKU: {sku}</Text>; 
}