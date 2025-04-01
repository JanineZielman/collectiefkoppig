import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isFilled } from "@prismicio/client";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

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
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
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

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());
  const navigation = await client.getByType("navigation");
  const projects = await client.getAllByType('project');

  return (
    <div className={`page ${page.uid}`}>
      <Layout navigation={navigation.results[0].data}>
        <h1 className="page-title">{prismic.asText(page.data.title)}</h1>
        <SliceZone slices={page.data.slices} components={components} />
        {projects.filter((project) => isFilled.contentRelationship(project.data.category) && project.data.category.uid == page.uid).length > 0 &&
        <div className="projects-grid-wrapper">
          <h2 className="title">Projecten</h2>
          <div className="project-grid">
            {projects.filter((project) => isFilled.contentRelationship(project.data.category) && project.data.category.uid == page.uid).slice(0,4).map((item, i) => {
              return(
                <div className="project-item" key={`project${i}`}>
                  <Link key={`project${i}`} href={`/projects/${item.uid}`}>
                    <h3>{item.data.title}</h3>
                    <PrismicNextImage field={item.data.image}/>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        }
      </Layout>
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
