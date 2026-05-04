import { Metadata } from 'next';
import { fetchProjects } from '@/lib/api';
import ProjectsClient from '@/components/ProjectClient';

export const metadata: Metadata = {
  title: 'Projects - Engineering Plus',
  description:
    'Explore our portfolio of successful EPC projects across STP, WTP, MEP, and interior solutions.',
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return <ProjectsClient projects={projects} />;
}