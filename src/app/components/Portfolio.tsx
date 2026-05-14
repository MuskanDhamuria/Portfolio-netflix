import { useState } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ContentRow } from "./ContentRow";
import { SkillsSection } from "./SkillsSection";
import { EducationTimeline } from "./EducationTimeline";
import { ProjectModal } from "./ProjectModal";
import { Footer } from "./Footer";
import { AwardsSection } from "./AwardsSection";
import { CertificatesSection } from "./CertificatesSection";
import { ConnectSection } from "./ConnectSection";
import data from "../../data.json";

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const standardCardWidth = "w-[170px] md:w-[240px] flex-none";
  const standardCardAspect = "aspect-[2/3]";

  // Safety check for data
  if (!data || !data.hero) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="scroll-mt-24">
        <Hero
          name={data.hero.name}
          tagline={data.hero.tagline}
          description={data.hero.description}
          videoUrl={data.hero.videoUrl}
        />
      </section>

      {/* Content Rows */}
      <div className="relative -mt-32 z-10 pb-16">
        {data.featuredProjects && (
          <section id="projects" className="scroll-mt-24">
            <ContentRow
              title="Featured Projects"
              items={data.featuredProjects}
              onItemClick={setSelectedItem}
              cardWidthClassName={standardCardWidth}
              cardAspectClassName={standardCardAspect}
            />
          </section>
        )}

        {data.workExperience && (
          <section id="experience" className="scroll-mt-24">
            <ContentRow
              title="Work Experience"
              items={data.workExperience}
              onItemClick={setSelectedItem}
              cardWidthClassName={standardCardWidth}
              cardAspectClassName={standardCardAspect}
            />
          </section>
        )}

        {data.skills && data.skills.categories && (
          <section id="skills" className="scroll-mt-24">
            <SkillsSection categories={data.skills.categories} />
          </section>
        )}

        {data.education && (
          <section id="education" className="scroll-mt-24">
            <EducationTimeline
              university={data.education.university}
              jc={data.education.jc}
              onItemClick={setSelectedItem}
            />
          </section>
        )}

        {data.awards && (
          <section id="awards" className="scroll-mt-24">
            <AwardsSection items={data.awards} />
          </section>
        )}

        {data.certificates && (
          <section id="certificates" className="scroll-mt-24">
            <CertificatesSection
              items={data.certificates}
              onItemClick={setSelectedItem}
            />
          </section>
        )}

        {data.connect && (
          <section id="connect" className="scroll-mt-24">
            <ConnectSection items={data.connect} />
          </section>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
