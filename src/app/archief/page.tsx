import { Metadata } from "next";

import { PrismicImage, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import Link from "next/link";


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
        <div className="projects-list">
          {projects.map((item, i) => {
            return(
              <div key={`project${i}`} className={`project project-link ${(item.data.category as ItemCategory)?.uid}`}>
                <Link href={`/projects/${item.uid}`}>
                  <h3>{item.data.title}</h3>
                  <div className="image-container">
                    <PrismicImage field={item.data.image} />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </Layout>
    </div>
  )
}
