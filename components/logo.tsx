import Image from "next/image";
import Link from "next/link";

export default function Logo({ isLight = false }: { isLight?: boolean }) {
  return isLight ? (
    <Link href={"/"}>
      <Image
        src={"/logo-light.svg"}
        width={200}
        height={100}
        priority
        alt="Logo"
        className=" h-8 md:h-10 "
      />
    </Link>
  ) : (
    <Link href={"/"}>
      <Image
        src={"/logo.svg"}
        width={200}
        height={100}
        priority
        alt="Logo"
        className=" h-8 md:h-10 "
      />
    </Link>
  );
}
