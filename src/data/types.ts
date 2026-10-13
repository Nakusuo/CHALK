export type CriteriaKey = "ensenanza" | "claridad" | "puntualidad" | "trato" | "practicas" | "accesibilidad";
export type Workload = "light" | "moderate" | "heavy";
export type TagType = "pos" | "neu" | "neg";

export interface Sede { id: string; name: string; region: string }
export interface Faculty { id: string; name: string; icon: string }

export interface Professor {
  id: number;
  name: string;
  emoji: string;
  dept: string;
  fac: string;
  courses: string[];
  sedes: string[];
  score: number;
  reviews: number;
  verified: boolean;
  experience: string;
  tags: string[];
  criteria: Record<CriteriaKey, number>;
  difficulty: number;
  workload: Workload;
  wouldTakeAgain: number;
  learningScore: number;
  approvalRate: number;
  gradeDistribution: number[];
  historicalRatings: { cycle: string; rating: number }[];
  courseRatings: Record<string, number>;
}

export interface Review {
  id: string;
  profId: number;
  user: string;
  initials: string;
  date: string;
  score: number;
  tags: string[];
  tagType: string[];
  text: string;
  helpful: number;
  course: string;
  difficulty: number;
  wouldTakeAgain: boolean | null;
  workload?: Workload | "";
  criteria?: Record<CriteriaKey, number>;
  createdAt?: string;
  authorCode?: string;
}

export interface User {
  code: string;
  email: string;
  name: string;
  initials: string;
  fac?: string;
  career?: string;
  sede?: string;
}
