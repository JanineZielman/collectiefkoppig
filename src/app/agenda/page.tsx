import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Layout from "@/components/layout";
import AgendaMasonry from "@/components/agendaMasonry";

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
  const client = createClient();
  const navigation = await client.getByType("navigation");

  // const todayFormatted = new Date().toISOString().split("T")[0];

  const agenda = await client.getAllByType("agenda_item", {
    // filters: [
    //   prismic.filter.dateAfter(
    //     "my.agenda_item.dateOrder",
    //     todayFormatted
    //   ),
    // ],
    orderings: [
      {
        field: "my.agenda_item.dateOrder",
        direction: "desc",
      },
    ],
  });

  return (
    <div className="agenda-page">
      <Layout navigation={navigation.results[0].data}>
        <h1 className="page-title">Agenda</h1>
        <AgendaMasonry agenda={agenda} />
      </Layout>
    </div>
  );
}
