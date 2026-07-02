import type { ImageMetadata } from 'astro';
import bcombsImage from '../assets/images/bcombs.webp';
import boardspeakImage from '../assets/images/boardspeak.webp';
import nestaraImage from '../assets/images/nestara.webp';
import nextpointImage from '../assets/images/nextpoint.webp';

export type Project = {
	name: string;
	title: string;
	description: string;
	background: 'lime' | 'cyan' | 'lavender' | 'mint';
	variant: 'desktop' | 'split' | 'mobile' | 'board';
	href: string;
	image: ImageMetadata;
	alt: string;
	imageClass: string;
};

export const workPageSize = 10;

export const projects: Project[] = [
	{
		name: 'Nextpoint',
		title: 'Making legal transcripts easier to scan, summarize, and act on with AI',
		description:
			'A transcript workflow rethought for faster review, clearer patterns, and less manual synthesis under pressure.',
		background: 'lime',
		variant: 'desktop',
		href: '/work/nextpoint',
		image: nextpointImage,
		alt: 'Nextpoint dashboard preview showing transcript and summary metrics',
		imageClass: 'project-preview-image',
	},
	{
		name: 'b.combs',
		title: 'A CRM designed around people and the work behind the data',
		description:
			'A more humane CRM experience for teams balancing operational detail with relationship-driven work.',
		background: 'cyan',
		variant: 'split',
		href: '/work/nextpoint',
		image: bcombsImage,
		alt: 'b.combs CRM preview showing nonprofit workflow screens',
		imageClass: 'project-preview-image',
	},
	{
		name: 'Nestara',
		title: 'Helping first-time buyers feel guided through a high-stress life decision',
		description:
			'A mobile-first experience focused on reassurance, next-step clarity, and decision confidence.',
		background: 'lavender',
		variant: 'mobile',
		href: '/work/nextpoint',
		image: nestaraImage,
		alt: 'Nestara mobile app preview showing real estate product screens',
		imageClass: 'project-preview-image',
	},
	{
		name: 'BoardSpeak',
		title: 'Turning community participation into a sustainable growth loop',
		description:
			'A civic product concept that makes participation feel rewarding, visible, and easier to sustain over time.',
		background: 'mint',
		variant: 'board',
		href: '/work/nextpoint',
		image: boardspeakImage,
		alt: 'BoardSpeak web app preview showing rewards and community interface',
		imageClass: 'project-preview-image',
	},
];
