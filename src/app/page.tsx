import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Layout from "@/components/layout"
import Loader from "@/components/loader"


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
  const agenda = await client.getAllByType("agenda_item",
    {
      orderings: [
        {
          field: 'my.agenda_item.dateOrder',
          direction: 'desc',
        },
      ]
    }
  );
  const intro = await client.getByType('intro');

  return (
    <div className="home">
      <Layout navigation={navigation.results[0].data}>
        <Loader agenda={agenda} intro={intro.results[0]} />
      </Layout>
      <div className="miertje"><img src="/Gif-Mier-1.gif" /></div>
      <div className="miertje-2"><img src="/Gif-Mier-1.gif" /></div>
      <div className="miertje-3"><img src="/Gif-Mier-1.gif" /></div>
    </div>
  )
}
