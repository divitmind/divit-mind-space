import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_MIND_GYM_QUERY } from "@/sanity/lib/queries";
import { SingleMindGymQueryResult } from "@/sanity/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { SchulteTable } from "@/components/mind-gym/games/schulte-table";
import { StroopTest } from "@/components/mind-gym/games/stroop-test";
import { ReactionTrainer } from "@/components/mind-gym/games/reaction-trainer";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/components/portable-text-components";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GamePageRoute({ params }: GamePageProps) {
  const { slug } = await params;
  
  const gameData = await sanityFetch({ 
    query: SINGLE_MIND_GYM_QUERY, 
    params: { slug },
    tags: ["mindGym"] 
  });
  
  const game = gameData.data as SingleMindGymQueryResult;

  if (!game) {
    // If it's one of our default slugs but not in Sanity, we still want to show it
    if (slug !== "schulte-table" && slug !== "stroop-test") {
      notFound();
    }
  }

  const renderGame = () => {
    switch (slug) {
      case "schulte-table":
        return <SchulteTable />;
      case "stroop-test":
        return <StroopTest />;
      case "pulse-check":
        return <ReactionTrainer />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Brain className="w-16 h-16 text-purple/20 mb-4" />
            <h2 className="text-2xl font-serif text-green">Coming Soon</h2>
            <p className="text-black/60">We are currently developing this exercise.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <Link 
          href="/mind-gym"
          className="inline-flex items-center gap-2 text-green/60 hover:text-green font-bold text-xs uppercase tracking-widest transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Gym
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-black/5 min-h-[500px] flex flex-col">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  {game?.title || (slug === "schulte-table" ? "Schulte Table" : "Stroop Test")}
                </h1>
                <p className="text-black/50 font-medium text-sm">
                  {game?.focusArea || (slug === "schulte-table" ? "Visual Scanning & Focus" : "Cognitive Flexibility")} • {game?.ageGroup || "All Ages"}
                </p>
              </div>
              
              <div className="flex-grow flex items-center justify-center">
                {renderGame()}
              </div>
            </div>
          </div>

          {/* Educational Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-green text-white rounded-[2rem] p-8 shadow-xl">
                <h3 className="text-xl font-serif italic mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  The Science Behind It
                </h3>
                <div className="text-white/80 text-sm leading-relaxed space-y-4 font-medium">
                  {game?.scienceBehindIt ? (
                    <PortableText value={game.scienceBehindIt} components={portableTextComponents} />
                  ) : (
                    <p>
                      {slug === "schulte-table" 
                        ? "The Schulte Table is a grid used for the development of speed reading, peripheral vision, attention and visual perception. By keeping your gaze on the center of the table, you train your brain to identify peripheral information faster."
                        : "The Stroop Effect demonstrates the interference in the reaction time of a task. It helps measure and train cognitive flexibility and selective attention—the ability to focus on specific information while filtering out distractions."
                      }
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-purple/5 rounded-[2rem] p-8 border border-purple/10">
                <h3 className="text-green font-bold text-xs uppercase tracking-widest mb-4">Quick Tips</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-black/70 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 shrink-0" />
                    Consistency is key—try 5 minutes daily.
                  </li>
                  <li className="flex gap-3 text-sm text-black/70 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 shrink-0" />
                    Focus on accuracy first, then speed.
                  </li>
                  <li className="flex gap-3 text-sm text-black/70 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 shrink-0" />
                    Eliminate external distractions while playing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
