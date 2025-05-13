import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Layout from "@/components/layout"
import AgendaMasonry from "@/components/agendaMasonry"

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

  return (
    <div className="agenda-page">
      <Layout navigation={navigation.results[0].data}>
        <h1 className="page-title">Agenda</h1>
        <AgendaMasonry agenda={agenda}/>
      </Layout>
    </div>
  )
}
