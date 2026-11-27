import type { SeedRoadmap } from "../types";
import { aiEngineerRoadmap } from "./ai-engineer";
import { backendEngineerRoadmap } from "./backend-engineer";
import { cloudEngineerRoadmap } from "./cloud-engineer";
import { cybersecurityEngineerRoadmap } from "./cybersecurity-engineer";
import { dataEngineerRoadmap } from "./data-engineer";
import { devopsEngineerRoadmap } from "./devops-engineer";
import { frontendEngineerRoadmap } from "./frontend-engineer";
import { fullStackEngineerRoadmap } from "./full-stack-engineer";
import { machineLearningEngineerRoadmap } from "./machine-learning-engineer";
import { softwareEngineerRoadmap } from "./software-engineer";

export const allSeedRoadmaps: SeedRoadmap[] = [
  dataEngineerRoadmap,
  backendEngineerRoadmap,
  frontendEngineerRoadmap,
  devopsEngineerRoadmap,
  machineLearningEngineerRoadmap,
  aiEngineerRoadmap,
  cloudEngineerRoadmap,
  cybersecurityEngineerRoadmap,
  fullStackEngineerRoadmap,
  softwareEngineerRoadmap,
];

export {
  aiEngineerRoadmap,
  backendEngineerRoadmap,
  cloudEngineerRoadmap,
  cybersecurityEngineerRoadmap,
  dataEngineerRoadmap,
  devopsEngineerRoadmap,
  frontendEngineerRoadmap,
  fullStackEngineerRoadmap,
  machineLearningEngineerRoadmap,
  softwareEngineerRoadmap,
};
