import { site } from "@/config/site";
import { profile, skills } from "@/content/profile";

/** schema.org graph so search engines can tie this site to the person and profiles */
export function PersonJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        givenName: profile.firstName,
        familyName: profile.lastName,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        jobTitle: "Software Engineering Student",
        description: site.description,
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
        homeLocation: { "@type": "Place", name: profile.location },
        knowsAbout: skills.flatMap((group) => group.items),
        sameAs: [site.links.github, site.links.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-CA",
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        mainEntity: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // json is escaped so a "</script>" inside content cannot break out
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
