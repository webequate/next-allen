// components/BusinessCard.tsx
import Image from "next/image";

const BusinessCard: React.FC = () => {
  return (
    <div className="mx-auto lg:flex lg:flex-row pb-4 align-top">
      <div className="w-full ring-1 ring-dark-3 dark:ring-light-3 rounded-xl shadow-lg mb-6 lg:w-1/2 lg:mr-2">
        <Image
          src="/images/card-front.jpg"
          alt="Front of business card"
          width={858}
          height={492}
          priority
          className="rounded-xl"
        />
      </div>
      <div className="w-full ring-1 ring-dark-3 dark:ring-light-3 rounded-xl shadow-lg mb-6 lg:w-1/2 lg:ml-2">
        <Image
          src="/images/card-back.jpg"
          alt="Back of business card"
          width={858}
          height={492}
          priority
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default BusinessCard;
