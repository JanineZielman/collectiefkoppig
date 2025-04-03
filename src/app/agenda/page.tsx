import { Metadata } from "next";

import { PrismicImage, PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
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

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const navigation = await client.getByType("navigation");
  const agenda = await client.getAllByType('agenda_item', {
    orderings: [
      {
        field: 'my.agenda_item.date',
        direction: 'asc',
      },
    ]
  });

  type ItemCategory = prismic.ContentRelationshipField<"category"> & { uid?: string };
  

  return (
    <div className="agenda-page">
      <Layout navigation={navigation.results[0].data}>
      <h1 className="page-title">Agenda</h1>
      <div className="agenda">
        <div className="wrapper">
          {agenda.map((item, i) => {
            return(
              <Link key={`agenda${i}`} 
                href={`/agenda/${item.uid}`} 
                className={`agenda-item ${((item.data.category as ItemCategory)?.uid || "")}`}
              >
                <div className={`image`}><PrismicImage field={item.data.image}/></div>
                <p className="date">
                  {item.data.date
                    ? new Date(item.data.date).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                      })
                    : "Geen datum beschikbaar"}
                </p>
                <h3>{item.data.title}</h3>
                {item.data.tijd &&  
                  <p><b>Tijd:</b> {item.data.tijd}</p>
                }
                 {item.data.programma.length > 0 &&
                  <div className="flex"><b>Programma:</b> <PrismicRichText field={item.data.programma}/></div>
                }
                {item.data.waar.length > 0 &&
                   <div className="flex"><b>Waar:</b> <PrismicRichText field={item.data.waar}/></div>
                }
              </Link>
            )
          })}
        </div>
        </div>
      </Layout>
    </div>
  )
}
