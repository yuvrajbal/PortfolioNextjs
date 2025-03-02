export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-zinc-950 mb-8 ">
      {children}
    </h1>
  );
}
