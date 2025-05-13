import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import Agenda from "@/components/agenda";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("agenda_item", uid).catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

type PageCategory = prismic.ContentRelationshipField<"page"> & { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("agenda_item", uid).catch(() => notFound());
  const navigation = await client.getByType("navigation");

  return (
    <div className={`page ${(page.data.category as PageCategory)?.uid}`}>
    <Layout navigation={navigation.results[0].data}>
      <Agenda page={page}/>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("agenda_item");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
