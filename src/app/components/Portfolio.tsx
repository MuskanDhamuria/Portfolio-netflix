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
import { SectionReveal } from "./SectionReveal";
import data from "../../data.json";

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const standardCardWidth = "w-[170px] md:w-[240px] flex-none";
  const standardCardAspect = "aspect-[2/3]";
  const featuredCardWidth = "w-[320px] md:w-[640px] flex-none";
  const featuredCardAspect = "aspect-[16/9]";
  const featuredProjectItem = data.featuredProjects?.find(
    (item: any) => item.id === "featured-video",
  );
  const projectItems = data.featuredProjects?.filter(
    (item: any) => item.id !== "featured-video",
  );

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
            {featuredProjectItem && (
              <SectionReveal>
                <ContentRow
                  title="Featured Projects"
                  items={[featuredProjectItem]}
                  onItemClick={setSelectedItem}
                  cardWidthClassName={featuredCardWidth}
                  cardAspectClassName={featuredCardAspect}
                  centered
                />
              </SectionReveal>
            )}
            {projectItems && projectItems.length > 0 && (
            <SectionReveal>
              <ContentRow
                title="Projects"
                items={projectItems}
                onItemClick={setSelectedItem}
                cardWidthClassName={standardCardWidth}
                cardAspectClassName={standardCardAspect}
              />
            </SectionReveal>
            )}
          </section>
        )}

        {data.workExperience && (
          <section id="experience" className="scroll-mt-24">
            <SectionReveal delay={0.03}>
              <ContentRow
                title="Work Experience"
                items={data.workExperience}
                onItemClick={setSelectedItem}
                cardWidthClassName={standardCardWidth}
                cardAspectClassName={standardCardAspect}
              />
            </SectionReveal>
          </section>
        )}

        {data.skills && data.skills.categories && (
          <section id="skills" className="scroll-mt-24">
            <SectionReveal delay={0.05}>
              <SkillsSection categories={data.skills.categories} />
            </SectionReveal>
          </section>
        )}

        {data.education && (
          <section id="education" className="scroll-mt-24">
            <SectionReveal delay={0.06}>
              <EducationTimeline
                university={data.education.university}
                jc={data.education.jc}
                onItemClick={setSelectedItem}
              />
            </SectionReveal>
          </section>
        )}

        {data.awards && (
          <section id="awards" className="scroll-mt-24">
            <SectionReveal delay={0.07}>
              <AwardsSection items={data.awards} />
            </SectionReveal>
          </section>
        )}

        {data.certificates && (
          <section id="certificates" className="scroll-mt-24">
            <SectionReveal delay={0.08}>
              <CertificatesSection
                items={data.certificates}
                onItemClick={setSelectedItem}
              />
            </SectionReveal>
          </section>
        )}

        {data.connect && (
          <section id="connect" className="scroll-mt-24">
            <SectionReveal delay={0.09}>
              <ConnectSection items={data.connect} />
            </SectionReveal>
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
