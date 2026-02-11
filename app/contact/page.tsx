import { Metadata } from "next";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Contact | ${basics.name}`,
  description: basics.contactIntro || "Get in touch with Allen Hayden Johnson.",
  openGraph: {
    images: ["https://allenhaydenjohnson.com/og-allen.png"],
  },
};

export default function ContactPage() {
  const { name, contactIntro, location, email, website, socialLinks } =
    basics as {
      name: string;
      contactIntro: string;
      location: string;
      email: string;
      website: string;
      socialLinks: SocialLink[];
    };

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="page-content">
        <div className="flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:mr-6">
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:ml-6">
            <ContactDetails
              name={name}
              contactIntro={contactIntro}
              location={location}
              email={email}
              website={website}
            />
          </div>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
