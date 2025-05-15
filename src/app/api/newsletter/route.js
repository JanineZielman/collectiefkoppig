export async function POST(req) {
  try {
    const { email } = await req.json();

    const response = await fetch(
      "https://api.emailoctopus.com/lists/aeec21a4-2b45-11f0-bb95-6f11fbd0eac1/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EMAILOCTOPUS_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          tags: ["newsletter"],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("EmailOctopus error:", data);
      return new Response(JSON.stringify({ error: data }), { status: response.status });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
