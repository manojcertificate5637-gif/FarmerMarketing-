import { PrototypeItem } from '../types/prototype';

export const INITIAL_PROTOTYPES: PrototypeItem[] = [
  {
    id: 'ai-studio-45f83cac',
    title: 'AI Studio Applet Prototype (45f83cac)',
    subtitle: 'Autonomous AI Evaluation & Multimodal Inference Studio',
    category: 'AI Application Studio',
    urlOrRef: 'https://ai.studio/apps/45f83cac-65ec-4558-b4c2-a119b58fba26?fullscreenApplet=true',
    defaultDevice: 'desktop',
    codeSnippet: `// Primary AI Studio Applet Prototype Component
export default function AIStudioApplet() {
  const [activeModel, setActiveModel] = useState('gemini-3.8-flash');
  const [pipelineState, setPipelineState] = useState('idle');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [systemInstruction, setSystemInstruction] = useState('You are an expert design architect...');
  const [promptInput, setPromptInput] = useState('Analyze user interface telemetry and optimize layout hierarchy');
  const [evaluationHistory, setEvaluationHistory] = useState([
    { id: 'run-902', model: 'gemini-3.8-flash', latencyMs: 142, tokens: 488, score: 96, status: 'Completed' },
    { id: 'run-901', model: 'gemini-3.8-flash', latencyMs: 184, tokens: 612, score: 94, status: 'Completed' },
    { id: 'run-900', model: 'gemini-3.1-flash-lite', latencyMs: 98, tokens: 320, score: 89, status: 'Completed' }
  ]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* 3-Zone Workspace Header */}
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-3.5">
        <h1 className="text-base font-semibold text-white">Gemini Multimodal Inference Studio</h1>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>Active Session: 45f83cac</span>
          <span>·</span>
          <span>Latency: 142ms</span>
        </div>
        <button className="px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
          Execute Inference
        </button>
      </header>
      {/* Interactive Controls & Telemetry Canvas */}
      ...
    </div>
  );
}`,
    analysis: {
      title: 'AI Studio Applet Prototype (45f83cac-65ec-4558-b4c2-a119b58fba26)',
      overview: 'Interactive architectural audit of the AI Studio Applet workspace. The application deploys a dual-column ergonomic workflow: an interactive model configuration sidebar on the left and an expansive inference evaluation canvas on the right with tabular telemetry and instant output visualization.',
      scores: {
        overall: 93,
        uxArchitecture: 95,
        designSystem: 94,
        accessibility: 91,
        performance: 96
      },
      metrics: {
        componentCount: 16,
        interactiveAffordances: 22,
        layoutScore: 'WCAG AA Compliant',
        colorBudget: '60% Slate-950 / 30% Slate-900 / 10% Indigo-500'
      },
      architecturalBreakdown: [
        {
          layer: 'Presentation & Viewport Contract',
          status: 'Optimal',
          findings: 'Maintains clean 1440px desktop baseline with fluid collapsible sidebar (280px). No overflow or layout jitter during high-throughput inference runs.'
        },
        {
          layer: 'Navigation & Workspace Header',
          status: 'Optimal',
          findings: 'Adheres to 3-zone top bar contract: single-line title wordmark, unboxed session metadata, and isolated single primary action.'
        },
        {
          layer: 'Data Density & Telemetry Alignment',
          status: 'Optimal',
          findings: 'Enforces tabular numerals (font-mono tabular-nums) across token consumption, latency, and throughput metrics, ensuring decimal alignment.'
        },
        {
          layer: 'State Containment & Reactivity',
          status: 'Optimal',
          findings: 'Local state handles model hyperparameter adjustments and real-time execution streaming without cross-component remounts.'
        }
      ],
      designSystemAudit: {
        typography: 'Plus Jakarta Sans for crisp UI hierarchy paired with JetBrains Mono for telemetry and JSON data output.',
        spacingAndMath: 'Outer container padding (24px) strictly exceeds inner component gaps (16px). Nested cards follow r_inner = r_outer - padding.',
        colorDistribution: 'Strict 60-30-10 palette using deep Slate-950 canvas, Slate-900 surface cards with hairline borders (border-slate-800), and Indigo-500 CTA.',
        antiSlopCompliance: '100% compliant. No pills, no // comment syntax, no decorative pulsing dots, no thick left border callouts.'
      },
      componentTree: [
        {
          name: 'AIStudioHeader',
          type: 'Layout',
          purpose: 'Provides workspace breadcrumbs, session identifier, and primary execute trigger',
          states: ['idle', 'running', 'error'],
          linesOfCode: 48
        },
        {
          name: 'ModelParameterSidebar',
          type: 'Control',
          purpose: 'Fine-tunes temperature, topP, safety thresholds, and system instruction context',
          states: ['default', 'collapsed', 'modified'],
          linesOfCode: 92
        },
        {
          name: 'PromptEvaluationCanvas',
          type: 'Control',
          purpose: 'High-comfort multiline input for user prompts with quick-preset tags and token counter',
          states: ['empty', 'focused', 'submitting'],
          linesOfCode: 84
        },
        {
          name: 'InferenceTelemetryFeed',
          type: 'DataDisplay',
          purpose: 'High-density tabular list of historical and live model runs with latency & token metrics',
          states: ['populated', 'filtering', 'streaming'],
          linesOfCode: 110
        },
        {
          name: 'OutputInspectorView',
          type: 'DataDisplay',
          purpose: 'Structured preview of generated responses with raw text and token breakdown tabs',
          states: ['empty', 'streaming', 'completed'],
          linesOfCode: 76
        }
      ],
      actionableRecommendations: [
        {
          priority: 'High',
          category: 'UX Flow',
          title: 'Direct Session Export & Public Sharing',
          description: 'AI Studio applet URLs (ai.studio/apps/<id>) are restricted to authenticated Google Accounts. Add a 1-click JSON/Code export so reviewers without project credentials can inspect prototypes directly.',
          suggestedFix: 'Implement exportSessionBundle() to serialize parameter state and telemetry into downloadable JSON.'
        },
        {
          priority: 'Medium',
          category: 'Accessibility',
          title: 'Slider ARIA Value Text Attributes',
          description: 'Ensure temperature and topP range inputs include aria-valuetext (e.g. "Temperature 0.7 - Balanced creativity") for screen readers.',
          suggestedFix: 'Add aria-valuetext={`${name}: ${value}`} to all input[type="range"] controls.'
        },
        {
          priority: 'Low',
          category: 'Code Quality',
          title: 'Memoize Inference Telemetry Rows',
          description: 'Wrap telemetry table rows in React.memo to prevent unnecessary re-renders when streaming high-frequency output tokens.',
          suggestedFix: 'Extract TelemetryRow into a memoized functional component.'
        }
      ],
      prototypeStrengths: [
        'Immediate execution response with real-time token feedback simulation',
        'Clean single-elevation card depth without nested box clutter',
        'Intuitive parameter sliders with instant numeric badge readout',
        'High density layout suited for professional developer workflows'
      ],
      potentialPitfalls: [
        'URL authentication boundary prevents direct unauthenticated iframe embedding',
        'High token prompts require graceful scroll overflow containment on tablet screens'
      ]
    }
  },
  {
    id: 'cloud-ops-dashboard',
    title: 'Autonomous Cloud Operations Console',
    subtitle: 'Cluster Health, Edge Ingress & Autonomous Auto-Remediation',
    category: 'Infrastructure & DevOps',
    defaultDevice: 'desktop',
    codeSnippet: `// Cloud Operations Prototype
export default function CloudOpsConsole() {
  const [clusterRegion, setClusterRegion] = useState('asia-southeast1');
  const [trafficFilter, setTrafficFilter] = useState('all');
  const [autoHealEnabled, setAutoHealEnabled] = useState(true);

  return (
    <div className="p-6 bg-slate-950 text-slate-100 min-h-full">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard label="Node Availability" value="99.98%" change="+0.02%" />
        <MetricCard label="Ingress Requests/sec" value="48,210" change="+12.4%" />
        <MetricCard label="P99 Response Time" value="38.4 ms" change="-4.1 ms" />
        <MetricCard label="Active Pod Instances" value="342" change="Nominal" />
      </div>
      ...
    </div>
  );
}`,
    analysis: {
      title: 'Autonomous Cloud Operations Console',
      overview: 'Real-time telemetry and cluster management dashboard. Features responsive 4-column metric strips, dynamic latency distribution bars, node status filters, and active incident remediation workflows.',
      scores: {
        overall: 91,
        uxArchitecture: 92,
        designSystem: 95,
        accessibility: 89,
        performance: 94
      },
      metrics: {
        componentCount: 14,
        interactiveAffordances: 19,
        layoutScore: 'WCAG AA Compliant',
        colorBudget: '60% Slate-950 / 30% Slate-900 / 10% Emerald-500'
      },
      architecturalBreakdown: [
        {
          layer: 'Grid & Data Density',
          status: 'Optimal',
          findings: 'High-density 36px table rows with strict right-alignment for numeric metrics.'
        },
        {
          layer: 'State Management',
          status: 'Optimal',
          findings: 'Client-side filter bar updates node lists and latency graphs synchronously with zero delay.'
        },
        {
          layer: 'Accessibility',
          status: 'Adequate',
          findings: 'Status badges pair semantic colors with textual status indicators for accessibility compliance.'
        }
      ],
      designSystemAudit: {
        typography: 'Plus Jakarta Sans for headings and navigation, JetBrains Mono for all latency numbers and IPs.',
        spacingAndMath: 'Consistent 16px component gap rhythm with 24px container padding.',
        colorDistribution: 'Slate neutral canvas with emerald-400 for nominal state and amber-400 for warning states.',
        antiSlopCompliance: 'Clean unboxed status metadata with mid-dots; no fake cybernetic decoration.'
      },
      componentTree: [
        {
          name: 'ClusterMetricsStrip',
          type: 'DataDisplay',
          purpose: 'Displays 4 key infrastructure health metrics with tabular numbers',
          states: ['default', 'highlighted'],
          linesOfCode: 52
        },
        {
          name: 'NodeTopologyTable',
          type: 'DataDisplay',
          purpose: 'Lists compute nodes with memory, CPU, and auto-heal status',
          states: ['all', 'warning', 'healthy'],
          linesOfCode: 98
        },
        {
          name: 'IncidentRemediationDrawer',
          type: 'Feedback',
          purpose: 'Simulates autonomous failover and rollback trigger execution',
          states: ['idle', 'executing', 'resolved'],
          linesOfCode: 64
        }
      ],
      actionableRecommendations: [
        {
          priority: 'Medium',
          category: 'Accessibility',
          title: 'Aria Live Region on Incident Stream',
          description: 'Announce simulated cluster failover events to assistive screen readers using aria-live="polite".',
          suggestedFix: 'Wrap incident notification stream in <div aria-live="polite" />.'
        }
      ],
      prototypeStrengths: [
        'Compact high-density telemetry layout',
        'Functional interactive remediation triggers with instantaneous state updates',
        'Clear visual distinction between nominal and degraded states'
      ],
      potentialPitfalls: [
        'Multi-column grid stacks to single-column on mobile viewports (<640px)'
      ]
    }
  },
  {
    id: 'design-system-sandbox',
    title: 'Enterprise Design System & Token Sandbox',
    subtitle: 'Form Controls, Segmented Filters, Data Visualizers & Modals',
    category: 'Design Systems',
    defaultDevice: 'desktop',
    codeSnippet: `// Design System Token Sandbox
export default function DesignSystemSandbox() {
  const [selectedTab, setSelectedTab] = useState('components');
  const [accentColor, setAccentColor] = useState('indigo');
  const [cornerRadius, setCornerRadius] = useState(8);

  return (
    <div className="p-6 bg-slate-950 text-slate-100 min-h-full">
      <header className="mb-6">
        <h2 className="text-xl font-bold">Enterprise Design System Playground</h2>
        <p className="text-sm text-slate-400">Auditing accessibility, interactive states, and nested radius math.</p>
      </header>
      ...
    </div>
  );
}`,
    analysis: {
      title: 'Enterprise Design System & Token Sandbox',
      overview: 'Interactive component library showcase designed to verify WCAG AA contrast compliance, zero-pill metadata rules, and nested radius mathematics across primary interactive elements.',
      scores: {
        overall: 95,
        uxArchitecture: 96,
        designSystem: 98,
        accessibility: 94,
        performance: 97
      },
      metrics: {
        componentCount: 20,
        interactiveAffordances: 28,
        layoutScore: 'WCAG AAA Compliant',
        colorBudget: '60% Slate-950 / 30% Slate-900 / 10% Indigo-500'
      },
      architecturalBreakdown: [
        {
          layer: 'Interactive Token Adjustments',
          status: 'Optimal',
          findings: 'Live CSS variable and style injection dynamically updates radius and accent colors across all child elements.'
        },
        {
          layer: 'Focus Management',
          status: 'Optimal',
          findings: 'High-contrast visible focus rings (ring-2 ring-indigo-500 ring-offset-2) present on all interactive controls.'
        }
      ],
      designSystemAudit: {
        typography: 'Display scale uses clamp() with balanced line wraps to eliminate orphan words.',
        spacingAndMath: 'Strict mathematical nested radii: r_inner = r_outer - padding computed in real time.',
        colorDistribution: 'Carefully measured 60-30-10 palette with accessible WCAG AAA ratios (7.2:1 text contrast).',
        antiSlopCompliance: 'Prohibits static pills, candy badges, code-comment headings, and asymmetric thick borders.'
      },
      componentTree: [
        {
          name: 'ButtonShowcaseMatrix',
          type: 'Control',
          purpose: 'Displays primary, secondary, outline, and destructive button states',
          states: ['default', 'hover', 'active', 'disabled'],
          linesOfCode: 65
        },
        {
          name: 'SegmentedControlStrip',
          type: 'Control',
          purpose: 'Interactive tab switchers with smooth 150ms animated transitions',
          states: ['active', 'inactive'],
          linesOfCode: 42
        },
        {
          name: 'InputValidationGroup',
          type: 'Control',
          purpose: 'Text inputs with floating labels, helper text, and accessible error indicators',
          states: ['idle', 'focused', 'error', 'valid'],
          linesOfCode: 70
        }
      ],
      actionableRecommendations: [
        {
          priority: 'Low',
          category: 'Design Polish',
          title: 'Color Blind Mode Toggle',
          description: 'Provide an interactive deuteranopia / protanopia simulation filter directly in the sandbox.',
          suggestedFix: 'Add SVG feColorMatrix filter toggle for simulated color vision deficiency.'
        }
      ],
      prototypeStrengths: [
        'Exemplary WCAG contrast and visible focus ring implementations',
        'Live interactive token adjustments with instant visual feedback',
        'Full state coverage for every button, input, and selector'
      ],
      potentialPitfalls: [
        'Token overrides require explicit reset controls to revert to baseline design system'
      ]
    }
  }
];
