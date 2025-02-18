import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import ZoomedSVGPage from "@/components/ZoomedSVGPage"

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const navigation = await client.getByType("navigation");
  const projects = await client.getAllByType('project');

  return (
    <Layout navigation={navigation.results[0].data}>
      <ZoomedSVGPage projects={projects}/>
      <SliceZone slices={home.data.slices} components={components} />
    </Layout>
  )
}
