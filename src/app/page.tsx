import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import ZoomableSVG from "@/components/ZoomableSVG"
import Loader from "@/components/loader"
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

type ItemCategory = prismic.ContentRelationshipField<"agenda"> & { uid: string };

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const navigation = await client.getByType("navigation");
  const agenda = await client.getAllByType("agenda_item", 
    {
      orderings: [
        {
          field: 'my.agenda_item.date',
          direction: 'asc',
        },
      ]
    }
  );

  return (
    <Layout navigation={navigation.results[0].data}>
      <Loader/>
      <ZoomableSVG/>
      <div className="agenda">
        <h2>Agenda</h2>
        {agenda.map((item, i) => {
          return(
            <Link key={`agenda${i}`} href={`/agenda/${item.uid}`} className={`agenda-item ${(item.data.category as ItemCategory)?.uid}`}>
              <p className="date">
                {item.data.date
                  ? new Date(item.data.date).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                    })
                  : "Geen datum beschikbaar"}
              </p>

              <h3>{prismic.asText(item.data.title)}</h3>
            </Link>
          )
        })}
        <div className="button">
          <Link href="/agenda">Bekijk alles</Link>
        </div>
      </div>
      <SliceZone slices={home.data.slices} components={components} />
    </Layout>
  )
}
