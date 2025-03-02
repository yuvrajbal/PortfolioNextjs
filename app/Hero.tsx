// import { GridBackgroundDemo } from "./GridBackground";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="py-24">
      <div className="flex gap-10 justify-between flex-col-reverse md:flex-row    mx-auto">
        <div className="tracking-tight text-lg">
          <h1 className="text-3xl md:text-5xl text-gray-950 dark:text-zinc-50 tracking-tight font-bold mb-4">
            Yuvraj Bal
          </h1>
          <p className=" text-zinc-700 dark:text-zinc-400 mb-5">
            Crafting digital experiences,{" "}
            <span className="dark:text-zinc-50 font-bold px-2 py-1 bg-gray-100 dark:bg-zinc-700">
              startups
            </span>{" "}
            and scaling{" "}
            <span className="dark:text-zinc-50 font-bold">side hustles</span>
          </p>
          <p className=" dark:text-zinc-500 text-zinc-600 leading-normal">
            Full-stack developer focused on building modern web apps and
            impactful SaaS solutions. Catch me on{" "}
            <a href="https://x.com/YuvrajBal4" target="_blank">
              <span className="dark:text-zinc-400 text-zinc-700 font-bold">
                twitter
              </span>
            </a>{" "}
            for tech updates and memes.
          </p>
        </div>

        <div className="flex items-center">
          <Image
            src="/grad_pic-cyan.png"
            width={192}
            height={192}
            className="w-48 md:w-56 lg:w-64 h-auto object-cover rounded-md"
            alt="Yuvraj Bal's profile picture"
            priority
          />
        </div>
      </div>
    </main>
  );
}
