// components/ContactDetails.tsx
import Heading from "@/components/Heading";
import DownloadCV from "@/components/DownloadCV";
import Link from "next/link";
import { FiUser, FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

interface ContactDetailsProps {
  name?: string;
  contactIntro?: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  resumeLink?: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  name,
  contactIntro,
  location,
  phone,
  email,
  website,
  resumeLink,
}) => {
  return (
    <div className="text-base text-left text-dark-2 dark:text-light-2 mt-0 lg:mt-8 ml-6 lg:ml-0">
      <Heading text="Contact Details" />
      {contactIntro && <p className="text-base mb-4">{contactIntro}</p>}
      <ul className="mb-6">
        {name && (
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiUser />
            </i>
            <span className="text-lg">{name}</span>
          </li>
        )}
        {location && (
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiMapPin />
            </i>
            <span className="text-lg">{location}</span>
          </li>
        )}
        {phone && (
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiPhone />
            </i>
            <span className="text-lg">{phone}</span>
          </li>
        )}
        {email && (
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiMail />
            </i>
            <span className="text-lg">
              <Link href={`mailto:${email}`}>{email}</Link>
            </span>
          </li>
        )}
        {website && (
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiGlobe />
            </i>
            <span className="text-lg">
              <Link href={`https://${website}`}>{website}</Link>
            </span>
          </li>
        )}
      </ul>
      {resumeLink && <DownloadCV resumelink={resumeLink} />}
    </div>
  );
};

export default ContactDetails;
