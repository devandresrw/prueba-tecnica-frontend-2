import dynamic from "next/dynamic";
import { RecaptchaProvider } from '@/providers/RecaptchaProvider'
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
  () => import('@/components/forms/Form').then((mod) => mod.FormMemo),
  { ssr: false }
)

export default function Home() {
  return (
    <main className=" min-h-screen p-5 bg-mybgcontend dark:bg-mybgcontenddark rounded-lg
    transition-all duration-500 ease-in-out flex flex-col justify-between items-center
    max-w-[18rem] md:max-w-[30rem] lg:max-w-[40rem] border-[0.2px] border-mybgdark dark:border-mybg border-transparent/50">
      <Header />
      <section className="flex flex-col  justify-center items-center w-full">
        <div className="w-full">
          <Scene />
        </div>
        <div className="w-full">
          <RecaptchaProvider>
            <Form />
          </RecaptchaProvider>
        </div>
      </section>
      <Footer />
    </main>
  );
}
