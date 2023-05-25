// components/Social.tsx
import { SocialLink } from "@/types/basics";
import SocialButton from "@/components/SocialButton";

interface SocialProps {
  socialLinks: SocialLink[];
}

const Social: React.FC<SocialProps> = ({ socialLinks }) => {
  return (
    <div className="font-general-regular flex justify-center items-center my-2">
      <ul className="flex gap-4 sm:gap-6">
        {socialLinks.map((socialLink, index) => (
          <li key={index} className="flex">
            <SocialButton
              key={socialLink.name}
              name={socialLink.name}
              url={socialLink.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Social;
