export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed")

  const { email } = req.body

  try {
    const response = await fetch("https://api.emailoctopus.com/lists/aeec21a4-2b45-11f0-bb95-6f11fbd0eac1/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eo_fe72670eae0f6cbda06b4935d8e7f4d6c2ee65ec4e996bafdb2f600abd1e3c0a`,
      },
      body: JSON.stringify({
        EmailAddress: email,
        tags: ["newsletter"],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}