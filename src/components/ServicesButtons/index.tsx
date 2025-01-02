import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ServicesButtons = () => {
  return (
    <>
      <Button type="button" variant="outline" className="w-full">
        <Image src="/google.svg" alt="Google icon" width={24} height={24} />
        Google
      </Button>

      <Button type="button" variant="outline" className="w-full">
        <Image
          src="/apple.svg"
          alt="Apple icon"
          color="currentColor"
          width={24}
          height={24}
        />
        Apple
      </Button>
    </>
  );
};
