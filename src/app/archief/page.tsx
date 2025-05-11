import { Metadata } from "next";

import { PrismicImage, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import Layout from "@/components/layout"
import Link from "next/link";
import ProjectList from "@/components/ProjectList";


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

type ItemCategory = prismic.ContentRelationshipField<"project"> & { uid: string };

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const navigation = await client.getByType("navigation");
  const projects = await client.getAllByType('project');
  

  return (
    <div className="archief">
      <Layout navigation={navigation.results[0].data}>
        <h1 className="page-title">Archief</h1>
        <ProjectList projects={projects} />
      </Layout>
    </div>
  )
}
