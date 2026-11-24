import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Automation } from "@/components/Automation";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { MintSection } from "@/components/nft/MintSection";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";

export default function Home() {
  const nftContractAddress =
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "";

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Automation />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Writing />
        {nftContractAddress && (
          <MintSection contractAddress={nftContractAddress} />
        )}
        <Contact />
      </main>
    </>
  );
}
