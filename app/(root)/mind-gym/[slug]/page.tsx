import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_MIND_GYM_QUERY } from "@/sanity/lib/queries";
import { SingleMindGymQueryResult } from "@/sanity/types";
import { notFound } from "next/navigation";
import { SchulteTable } from "@/components/mind-gym/games/schulte-table";
import { StroopTest } from "@/components/mind-gym/games/stroop-test";
import { ReactionTrainer } from "@/components/mind-gym/games/reaction-trainer";
import { NeuralFusion } from "@/components/mind-gym/games/neural-fusion";
import { MindfulPaths } from "@/components/mind-gym/games/mindful-paths";
import { GameLayout } from "@/components/mind-gym/game-layout";
import { Brain } from "lucide-react";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

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
    const defaultSlugs = ["schulte-table", "stroop-test", "pulse-check", "neural-fusion", "mindful-paths"];
    if (!defaultSlugs.includes(slug)) {
      notFound();
    }
  }

  const getPlaceholderData = () => {
    switch (slug) {
      case "schulte-table":
        return {
          title: "Schulte Table",
          focusArea: "Visual Scanning & Focus",
          ageGroup: "All Ages",
          science: "The Schulte Table is a grid used for the development of speed reading, peripheral vision, attention and visual perception. By keeping your gaze on the center of the table, you train your brain to identify peripheral information faster.",
          tips: ["Consistency is key—try 5 minutes daily.", "Focus on accuracy first, then speed.", "Eliminate external distractions while playing."]
        };
      case "stroop-test":
        return {
          title: "Stroop Test",
          focusArea: "Cognitive Flexibility",
          ageGroup: "Teens & Adults",
          science: "The Stroop Effect demonstrates the interference in the reaction time of a task. It helps measure and train cognitive flexibility and selective attention—the ability to focus on specific information while filtering out distractions.",
          tips: ["Don't read the word—look at the ink color.", "Squint slightly to blur the text if you're struggling.", "Take deep breaths to maintain focus under pressure."]
        };
      case "pulse-check":
        return {
          title: "Pulse Check",
          focusArea: "Processing Speed",
          ageGroup: "All Ages",
          science: "Reaction time is a measure of how quickly an organism can respond to a particular stimulus. In humans, it reflects neural efficiency and the speed of information processing between the eyes, brain, and muscles.",
          tips: ["Rest your finger on the button/screen for faster clicks.", "Maintain a steady 'breathing' rhythm while waiting.", "Try to react to the color change, not the text."]
        };
      case "neural-fusion":
        return {
          title: "Neural Fusion",
          focusArea: "Strategic Planning",
          ageGroup: "Teens & Adults",
          science: "Neural Fusion (inspired by 2048) trains executive function, specifically working memory and long-term strategic planning. It requires the brain to calculate multiple future states and recognize emerging patterns in a constrained environment.",
          tips: ["Keep your highest number in a corner.", "Try to build 'chains' of decreasing numbers.", "Think 2-3 moves ahead before sliding."]
        };
      case "mindful-paths":
        return {
          title: "Mindful Paths",
          focusArea: "Spatial Reasoning",
          ageGroup: "All Ages",
          science: "Spatial reasoning involves the capacity to mentally manipulate 2D and 3D objects. Mindful Paths challenges the brain to recognize patterns and visualize flow, strengthening the parietal lobe's ability to process geometric relationships.",
          tips: ["Look for the 'fixed' points first.", "Visualize the path before you start clicking.", "Focus on one section of the grid at a time."]
        };
      default:
        return {
          title: "Brain Exercise",
          focusArea: "Cognitive Games",
          ageGroup: "All Ages",
          science: "Interactive cognitive exercises help maintain neural plasticity and sharpen mental acuity through targeted stimulation of specific brain regions.",
          tips: ["Stay consistent.", "Challenge yourself.", "Have fun while learning."]
        };
    }
  };

  const placeholder = getPlaceholderData();

  const renderGame = () => {
    switch (slug) {
      case "schulte-table": return <SchulteTable />;
      case "stroop-test": return <StroopTest />;
      case "pulse-check": return <ReactionTrainer />;
      case "neural-fusion": return <NeuralFusion />;
      case "mindful-paths": return <MindfulPaths />;
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
    <GameLayout
      title={game?.title || placeholder.title}
      focusArea={game?.focusArea || placeholder.focusArea}
      ageGroup={game?.ageGroup || placeholder.ageGroup}
      science={game?.scienceBehindIt || placeholder.science}
      tips={game?.quickTips || placeholder.tips}
      slug={slug}
    >
      {renderGame()}
    </GameLayout>
  );
}
