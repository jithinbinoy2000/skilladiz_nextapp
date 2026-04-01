export default function Head() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = siteUrl ? `${siteUrl}/` : null;
  const ogImage =
    "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp";

  return (
    <>
      <title>Skilladiz Gaming Club | Where Skill Meets Chill</title>
      <meta
        name="description"
        content="Skilladiz Gaming Club is a premium gaming arena experience with tournaments, PS5 battles, VR zones, cue sports, and community events. Level up your play in a chill, café-style atmosphere."
      />
      <meta
        name="keywords"
        content="Skilladiz Gaming Club, gaming club, gaming arena, gaming lounge, esports arena, VR gaming, PS5 arena, 8 ball pool, snooker, tournaments, gaming community, cafe style gaming, Kochi gaming club"
      />
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Skilladiz Gaming Club | Where Skill Meets Chill" />
      <meta
        property="og:description"
        content="Experience tournaments, PS5 battles, VR zones, cue sports, and a vibrant gaming community at Skilladiz Gaming Club."
      />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Skilladiz Gaming Club | Where Skill Meets Chill" />
      <meta
        name="twitter:description"
        content="Skilladiz Gaming Club: premium gaming zones, tournaments, and a café-style chill atmosphere." 
      />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
