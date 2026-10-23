export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface PrototypeScore {
  overall: number;
  uxArchitecture: number;
  designSystem: number;
  accessibility: number;
  performance: number;
}

export interface ArchitecturalLayer {
  layer: string;
  status: 'Optimal' | 'Adequate' | 'Needs Optimization';
  findings: string;
}

export interface ComponentNode {
  name: string;
  type: 'Layout' | 'Control' | 'DataDisplay' | 'Feedback';
  purpose: string;
  states: string[];
  linesOfCode?: number;
}

export interface Recommendation {
  priority: 'High' | 'Medium' | 'Low';
  category: 'UX Flow' | 'Accessibility' | 'Code Quality' | 'Design Polish';
  title: string;
  description: string;
  suggestedFix: string;
}

export interface PrototypeAnalysis {
  title: string;
  overview: string;
  scores: PrototypeScore;
  metrics: {
    componentCount: number;
    interactiveAffordances: number;
    layoutScore: string;
    colorBudget: string;
  };
  architecturalBreakdown: ArchitecturalLayer[];
  designSystemAudit: {
    typography: string;
    spacingAndMath: string;
    colorDistribution: string;
    antiSlopCompliance: string;
  };
  componentTree: ComponentNode[];
  actionableRecommendations: Recommendation[];
  prototypeStrengths: string[];
  potentialPitfalls: string[];
}

export interface PrototypeItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  urlOrRef?: string;
  defaultDevice: DeviceMode;
  analysis: PrototypeAnalysis;
  codeSnippet: string;
}
