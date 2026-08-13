import type { ReactNode } from 'react'
import projectOne from '../assets/projects/project-one.png'
import crashSeverity from '../assets/projects/crash-severity.png'
import strokePrediction from '../assets/projects/stroke-prediction.png'

export const highlightName = 'Allyanna Panganiban'

export type Project = {
  number: string
  area: string
  year: string
  title: string
  authors: string[]
  description: ReactNode | ReactNode[]
  tags: string[]
  image?: string
  imageFramed?: boolean
  award?: string
  links?: { label: string; href: string }[]
  href?: string
  slug?: string
  summary?: string
  duration?: string
  team?: { name: string; role: string }[]
  tools?: string[]
  focusAreas?: string[]
}

export const projects: Project[] = [
  {
    number: '01',
    area: 'AI & Engineering',
    year: '2026',
    title: 'Optimizing Emergency Department Staffing Under Uncertainty',
    authors: ['Brandon Jackson', 'Allyanna Panganiban', 'Karen Sabile'],
    description: (
      <>
        Developed a robust optimization model to optimize nurse staffing under{' '}
        <strong>uncertain patient demand</strong>, using Monte Carlo simulation and
        data-driven resource allocation to improve operational resilience.
      </>
    ),
    tags: ['Python', 'Gurobi', 'Robust Optimization', 'Monte Carlo Simulation'],
    image: projectOne,
    links: [
      { label: 'Code', href: 'https://github.com/allyannap/5211_final' },
      {
        label: 'Paper',
        href: 'https://drive.google.com/file/d/1tzhNd-TLnPA8gQAkvAfnghfXMZAPpPIk/view?usp=sharing',
      },
    ],
  },
  {
    number: '02',
    area: 'AI & Engineering',
    year: '2026',
    title: 'Agentic AI for NYC Urban Risk Intelligence',
    authors: ['Allyanna Panganiban', 'Louise Smith'],
    summary:
      "An agentic decision-support system that turns NYC's daily risk data into early-warning insights for 59 communities.",
    description: [
      <>
        Built an <strong>AI decision-support</strong> system using GPT-4o and PydanticAI to
        orchestrate seven analytical <strong>tools</strong> for <strong>autonomous</strong>{' '}
        risk analysis.
      </>,
      <>
        The agent transforms ~133K daily records per metric into early-warning insights across
        59 NYC communities, with <strong>LLM-based model evaluation</strong> for{' '}
        <strong>response quality</strong>.
      </>,
    ],
    award: '🏆 1st Place — Cornell Systems Engineering Spring Hackathon',
    tags: ['Agentic AI', 'LLM', 'PydanticAI', 'GPT-4o', 'PostgreSQL', 'Supabase'],
    slug: 'agentic-ai-nyc-urban-risk-intelligence',
    duration: '24 hours',
    team: [
      { name: 'Allyanna Panganiban', role: 'Frontend Engineer' },
      { name: 'Louise Smith', role: 'Backend Engineer' },
    ],
    tools: ['Python', 'Shiny', 'PydanticAI', 'GPT-4o', 'Supabase', 'PostgreSQL', 'Folium'],
    focusAreas: ['Agentic AI', 'Decision Support', 'Data Visualization', 'Geospatial'],
    links: [
      { label: 'Live Demo', href: 'https://connect.systems-apps.com/nyc_risk/' },
      { label: 'GitHub', href: 'https://github.com/louiseismith/hackathon/tree/main' },
    ],
  },
  {
    number: '03',
    area: 'AI & Engineering',
    year: '2026',
    title: 'Energy Burden Mapper: Multi-Agent Geospatial Intelligence',
    authors: ['Selena Zheng', 'Allyanna Panganiban', 'Louise Smith', 'Sophie Wang'],
    description: [
      <>
        Built an <strong>AI-powered energy burden platform</strong> with a{' '}
        <strong>3-agent orchestration pipeline</strong>, <strong>tool-calling chatbot</strong>,
        and real-time Census/Supabase data pipeline.
      </>,
      <>
        Seven callable tools enable tract-level analysis and cross-county comparisons, with{' '}
        <strong>automated validation</strong> for <strong>response accuracy</strong> and{' '}
        <strong>hallucination detection</strong>.
      </>,
    ],
    tags: ['Multi-Agent Systems', 'LLM Tool Calling', 'Python', 'Supabase'],
  },
  {
    number: '04',
    area: 'Data Science',
    year: '2025',
    title: 'Adventura: Park Recommendation System',
    authors: [
      'Caitlyn Jin',
      'Sophia Pan',
      'Allyanna Panganiban',
      'Karen Sabile',
      'Amanda Yongvanich',
    ],
    description: [
      <>
        Built an <strong>information retrieval</strong> system that recommends amusement parks
        matched to a user's ideal experience, using <strong>TF-IDF</strong>,{' '}
        <strong>cosine similarity</strong>,
        and <strong>SVD</strong> for <strong>latent semantic</strong> matching.
      </>,
      <>
        Combines web-scraped park data with Google-sourced reviews across hundreds of U.S.
        parks, ranking results by relevance to open-ended natural language{' '}
        <strong>ad-hoc queries</strong>.
      </>,
    ],
    tags: ['Python', 'Information Retrieval', 'TF-IDF', 'Cosine Similarity', 'SVD'],
  },
  {
    number: '05',
    area: 'Data Science',
    year: '2025',
    title: 'Factors of Crash Severity in the U.S.',
    authors: ['Alexandra Jane Orantia', 'Allyanna Panganiban', 'Max Castanon', 'Sam Friedman'],
    description:
      'Analyzed over 800,000 U.S. traffic accidents to uncover the environmental and infrastructure factors most associated with crash severity using machine learning and statistical modeling.',
    tags: ['Machine Learning', 'Predictive Analytics', 'Transportation', 'Data Visualization'],
    image: crashSeverity,
    imageFramed: true,
    links: [
      {
        label: 'Paper',
        href: 'https://drive.google.com/file/d/1iFvPtnjAj9iyTG2_H-jCizmqohuZ_2iH/view?usp=sharing',
      },
    ],
  },
  {
    number: '06',
    area: 'Design',
    year: '2023',
    title: 'BeReal Case Study',
    authors: ['Allyanna Panganiban'],
    description: (
      <>
        Researched user needs, designed fidelity flows, and prototyped a tag user feature on
        BeReal (<strong>prior</strong> to BeReal's tag user feature release 1.19.1) to promote
        user interaction and build deeper connections with memory-sharing.
      </>
    ),
    tags: [],
  },
  {
    number: '07',
    area: 'Data Science',
    year: '2022',
    title: 'Stroke Analysis and Prediction',
    authors: ['Allyanna Panganiban'],
    description:
      'Conducted exploratory data analysis (EDA) to uncover relationships between patient health factors and stroke risk, preprocessed and analyzed clinical data, and developed a neural network model to predict stroke outcomes.',
    tags: ['Healthcare', 'Machine Learning', 'Predictive Modeling', 'Exploratory Data Analysis'],
    image: strokePrediction,
    imageFramed: true,
    href: 'https://drive.google.com/file/d/1L15p84rYNv6s7l2uXGsyzySz_ZMWm2-u/view?usp=sharing',
  },
]
