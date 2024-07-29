import Footer from "@/components/utility/Footer";
import Header from "@/components/utility/Header";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Subscribe from "@/components/home/Subscribe";

export default function Home() {
  return (
    <>
      <Header nav={{ label: "Login", link: "/login" }} />
      <main className="font-roboSlab">
        <section className="flex flex-col px-4 pb-7 *:grow md:flex-row-reverse md:*:w-0">
          <Hero />
        </section>
        <section
          id="feature"
          className="mt-6 flex flex-col items-center gap-12 bg-grey-100 px-4 py-10"
        >
          <Features />
        </section>
        <section className="padding-x w-full px-4 pb-6 pt-14 md:px-10">
          <Subscribe />
        </section>
      </main>
      <Footer />
    </>
  );
}
