import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import act from './schemas/act'
import vendor from './schemas/vendor'
import teamMember from './schemas/teamMember'
import faq from './schemas/faq'
import galleryImage from './schemas/galleryImage'
import siteSettings from './schemas/siteSettings'

export default defineConfig({
  name: 'natfest',
  title: 'Natfest CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'v3uvil06',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: [act, vendor, teamMember, faq, galleryImage, siteSettings],
  },
})
