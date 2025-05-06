import dynamic from "next/dynamic";

const Header = dynamic(
  () => import('@/components/utils/Header').then((mod) => mod.HeaderMemo),
  { ssr: false }
)
const Footer = dynamic(
  () => import('@/components/utils/Footer').then((mod) => mod.FooterMemo),
  { ssr: false }
)
const Scene = dynamic(
  () => import('@/components/scene/Scene').then((mod) => mod.SceneMemo),
  { ssr: false }
)
const Form = dynamic(
  () => import('@/components/forms/Form').then((mod) => mod.ContactForm),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="bg-mybg dark:bg-mybgdark min-h-screen p-10
    transition-all duration-500 ease-in-out flex flex-col justify-between items-center
    ">
      <Header />
      <section className="flex justify-center items-center w-full">
        <div className="flex-1">
          <Scene />
        </div>
        <div className="flex-1">
          <Form />
        </div>
      </section>
      <Footer />
    </main>
  );
}
