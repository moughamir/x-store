import ProductClient from "./product-client";

export default async function ProductPage(props: {
  params: Promise<{ key: string }>;
}) {
  const params = await props.params;
  return <ProductClient productKey={params.key} />;
}
