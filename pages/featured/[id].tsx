// pages/featured/[id].tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import { motion } from "framer-motion";
import { Post } from "@/types/photo";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import PostHeader from "@/components/PhotoHeader";
import Image from "next/image";
import PostFooter from "@/components/PhotoFooter";
import Footer from "@/components/Footer";
import { parseAlienCaption } from "@/lib/utils";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

interface PostProps {
  name: string;
  socialLinks: SocialLink[];
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}

const Post = ({ name, socialLinks, post, prevPost, nextPost }: PostProps) => {
  const caption = parseAlienCaption(post.title);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextPost) return;
      if (isMobile) {
        router.push(`/featured/${nextPost?.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevPost) return;
      if (isMobile) {
        router.push(`/featured/${prevPost?.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center text-dark-1 dark:text-light-1">
          <PostHeader
            title={caption.title}
            prevId={prevPost?.id}
            nextId={nextPost?.id}
            path="featured"
          />
          <Image
            {...handlers}
            src={`/${Array.isArray(post.uri) ? post.uri[0] : post.uri}`}
            alt={caption.title}
            width={600}
            height={600}
            priority
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-2"
          />
          <PostFooter additional={caption.additional} />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await clientPromise;
  const db = client.db("allensaliens");

  const postsCollection = db.collection<Post>("posts");
  const posts: Post[] = await postsCollection
    .find({ featured: true })
    .sort({ order: 1 })
    .toArray();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const client = await clientPromise;
  const db = client.db("allensaliens");

  const postsCollection = db.collection<Post>("posts");
  const posts: Post[] = await postsCollection
    .find({ featured: true })
    .sort({ order: 1 })
    .toArray();

  const postIndex = posts.findIndex((p) => p.id === Number(params.id));
  const post = posts[postIndex];
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      post: JSON.parse(JSON.stringify(post)),
      prevPost: prevPost ? JSON.parse(JSON.stringify(prevPost)) : null,
      nextPost: nextPost ? JSON.parse(JSON.stringify(nextPost)) : null,
    },
    revalidate: 60,
  };
};

export default Post;
