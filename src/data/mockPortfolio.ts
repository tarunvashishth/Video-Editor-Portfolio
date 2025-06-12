import { Portfolio } from '../types/portfolio';

export const mockPortfolio: Portfolio = {
  id: '1',
  username: 'sonuchoudhary',
  firstName: 'Sonu',
  lastName: 'Choudhary',
  summary: 'Professional video editor with 5+ years of experience in creating engaging content for brands, influencers, and businesses. Specializing in YouTube content, social media videos, and corporate presentations. Passionate about storytelling through visual media and helping creators grow their audience through compelling video content.',
  employers: [
    {
      id: '1',
      name: 'Freelance Video Editor',
      jobTitle: 'Video Editor',
      duration: '2020 - Present',
      type: 'contract',
      contribution: 'Creating high-quality video content for various clients including:\n• YouTube channels (500K+ subscribers)\n• Corporate clients (Tech, Fashion, Education)\n• Social media influencers\n• Small businesses\n\nSpecialized in:\n• Video editing and post-production\n• Motion graphics and animations\n• Color grading and correction\n• Sound design and mixing\n• Project management and client communication',
      videos: [
        {
          id: '1',
          url: 'https://youtube.com/watch?v=techstart',
          title: 'TechStart Brand Video',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60'
        },
        {
          id: '2',
          url: 'https://youtube.com/watch?v=travelvlog',
          title: 'Southeast Asia Travel Series',
          thumbnail: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop&q=60'
        }
      ]
    },
    {
      id: '2',
      name: 'Digital Media Agency',
      jobTitle: 'Video Editor',
      duration: '2018 - 2020',
      type: 'full-time',
      contribution: 'Led a team of 5 video editors in creating content for major brands:\n• Managed multiple concurrent projects\n• Developed editing workflows and standards\n• Trained junior editors\n• Client relationship management\n• Quality control and final delivery',
      videos: [
        {
          id: '3',
          url: 'https://youtube.com/watch?v=ecowear',
          title: 'EcoWear Product Launch',
          thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60'
        }
      ]
    },
    {
      id: '3',
      name: 'Content Creation Studio',
      jobTitle: 'Video Editor',
      duration: '2016 - 2018',
      type: 'full-time',
      contribution: 'Created engaging video content for social media platforms:\n• YouTube channel management\n• Social media video production\n• Basic motion graphics\n• Video optimization for different platforms\n• Analytics and performance tracking',
      videos: [
        {
          id: '4',
          url: 'https://youtube.com/watch?v=socialmedia',
          title: 'Social Media Campaign',
          thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60'
        }
      ]
    }
  ]
};
