'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import * as resolve from '@/sanity/plugins/resolve';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import post from '@/sanity/schemas/documents/post';
import project from '@/sanity/schemas/documents/project';
import duration from '@/sanity/schemas/objects/duration';
import milestone from '@/sanity/schemas/objects/milestone';
import multipleImages from '@/sanity/schemas/objects/multiple-images';
import timeline from '@/sanity/schemas/objects/timeline';
import about from '@/sanity/schemas/singletons/about';
import home from '@/sanity/schemas/singletons/home';
import postList from '@/sanity/schemas/singletons/post-list';
import projectList from '@/sanity/schemas/singletons/project-list';
import settings from '@/sanity/schemas/singletons/settings';

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io';

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      about,
      settings,
      postList,
      projectList,
      // Documents
      post,
      project,
      // Objects
      multipleImages,
      duration,
      milestone,
      timeline,
    ],
  },
  plugins: [
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
    }),
    structureTool({
      structure: pageStructure([home, about, postList, projectList, settings]),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([
      home.name,
      about.name,
      postList.name,
      projectList.name,
      settings.name,
    ]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
