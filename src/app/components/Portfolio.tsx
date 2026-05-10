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
import data from "../../data.json";

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const standardCardWidth = "w-[200px] md:w-[280px] flex-none";
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
      <Hero
        name={data.hero.name}
        tagline={data.hero.tagline}
        description={data.hero.description}
        videoUrl={data.hero.videoUrl}
      />

      {/* Content Rows */}
      <div className="relative -mt-32 z-10 pb-16">
        {data.featuredProjects && (
          <ContentRow
            title="Featured Projects"
            items={data.featuredProjects}
            onItemClick={setSelectedItem}
            cardWidthClassName={standardCardWidth}
            cardAspectClassName={standardCardAspect}
          />
        )}

        {data.workExperience && (
          <ContentRow
            title="Work Experience"
            items={data.workExperience}
            onItemClick={setSelectedItem}
            cardWidthClassName={standardCardWidth}
            cardAspectClassName={standardCardAspect}
          />
        )}

        {data.skills && data.skills.categories && (
          <SkillsSection categories={data.skills.categories} />
        )}

        {data.education && (
          <EducationTimeline
            university={data.education.university}
            jc={data.education.jc}
            onItemClick={setSelectedItem}
          />
        )}

        {data.awards && <AwardsSection items={data.awards} />}

        {data.certificates && (
          <CertificatesSection
            items={data.certificates}
            onItemClick={setSelectedItem}
          />
        )}

        {data.connect && (
          <ContentRow
            title="Connect with Me"
            items={data.connect}
            onItemClick={setSelectedItem}
            cardWidthClassName="w-[170px] md:w-[220px] flex-none"
            cardAspectClassName="aspect-square"
            centered
          />
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
