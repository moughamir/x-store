import CollectionClient from "./collection-client";

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  return <CollectionClient handle={params.handle} />;
}
