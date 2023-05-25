// components/Instructions.tsx
import { SocialLink } from "@/types/basics";
import Link from "next/link";

interface InstructionsProps {
  socialLink: SocialLink;
}

const Instructions: React.FC<InstructionsProps> = ({ socialLink }) => {
  const instagramUrl = socialLink.url;
  const instagramHandle = socialLink.handle;

  return (
    <div className="mx-auto text-center mb-10">
      <p>To submit a photo featuring your alien, you have two options:</p>
      <ol>
        <li>
          1) Post your photo to Instagram and tag{" "}
          <Link
            href={instagramUrl}
            className="text-accent-light hover:underline"
          >
            @{instagramHandle}
          </Link>{" "}
          in your post.
        </li>
        <li>
          2) Direct message your photo to{" "}
          <Link
            href={instagramUrl}
            className="text-accent-light hover:underline"
          >
            @{instagramHandle}
          </Link>{" "}
          on Instagram.
        </li>
      </ol>
      <p>Keep an eye on Instagram to see if your alien photo is featured.</p>
    </div>
  );
};

export default Instructions;
