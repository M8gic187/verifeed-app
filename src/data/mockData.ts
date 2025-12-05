import { User, Post, Story, Forum, ForumThread, GroupChat, ChatMessage } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'techexpert',
    displayName: 'Dr. Tech Expert',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isVerified: true,
    bio: 'Tech journalist & AI researcher'
  },
  {
    id: '2',
    username: 'sciencenews',
    displayName: 'Science Daily',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isVerified: true,
    bio: 'Breaking science news'
  },
  {
    id: '3',
    username: 'funnyvideos',
    displayName: 'Comedy Central',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isVerified: true,
    bio: 'Making you laugh daily'
  },
  {
    id: '4',
    username: 'sarah_m',
    displayName: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isVerified: false,
    bio: 'Coffee lover ☕'
  },
  {
    id: '5',
    username: 'currentuser',
    displayName: 'Max Mustermann',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    isVerified: false,
    bio: 'Just exploring!'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content: 'Neue Studie zeigt: KI-Systeme können jetzt komplexe medizinische Diagnosen mit 95% Genauigkeit stellen. Das revolutioniert die Gesundheitsversorgung! 🏥',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      isAiGenerated: false
    },
    sources: ['Nature Medicine Journal 2024', 'WHO Health Report'],
    likes: 1243,
    comments: 89,
    shares: 234,
    createdAt: new Date(Date.now() - 3600000),
    category: 'educational',
    keywords: ['ki', 'medizin', 'technologie', 'gesundheit']
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Durchbruch in der Klimaforschung: Wissenschaftler entwickeln neue Methode zur CO2-Bindung, die 10x effizienter ist als bisherige Ansätze.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop',
      isAiGenerated: false
    },
    sources: ['Science Magazine', 'MIT Technology Review'],
    likes: 2891,
    comments: 156,
    shares: 567,
    createdAt: new Date(Date.now() - 7200000),
    category: 'educational',
    keywords: ['klima', 'wissenschaft', 'umwelt', 'forschung']
  },
  {
    id: '4',
    author: mockUsers[0],
    content: '⚠️ WARNUNG: Dieses Video wurde als KI-generiert erkannt. Unser System hat es automatisch markiert.',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      isAiGenerated: true
    },
    sources: ['KI-Analyse System'],
    likes: 234,
    comments: 45,
    shares: 12,
    createdAt: new Date(Date.now() - 14400000),
    category: 'other',
    keywords: ['ki', 'warnung'],
    isFlagged: true,
    flagReason: 'KI-generierter Content erkannt'
  }
];

export const mockStories: Story[] = [
  {
    id: '1',
    author: mockUsers[3],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop'
    },
    reactions: [{ emoji: '❤️', userId: '5' }],
    createdAt: new Date(Date.now() - 3600000),
    expiresAt: new Date(Date.now() + 82800000),
    viewed: false
  },
  {
    id: '2',
    author: mockUsers[0],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=700&fit=crop'
    },
    reactions: [],
    createdAt: new Date(Date.now() - 7200000),
    expiresAt: new Date(Date.now() + 79200000),
    viewed: true
  }
];

export const mockForums: Forum[] = [
  {
    id: '1',
    name: 'Technologie',
    description: 'Diskussionen über Tech, KI und die digitale Zukunft',
    memberCount: 125400,
    icon: '💻'
  },
  {
    id: '2',
    name: 'Wissenschaft',
    description: 'Neueste wissenschaftliche Entdeckungen',
    memberCount: 89200,
    icon: '🔬'
  },
  {
    id: '3',
    name: 'Unterhaltung',
    description: 'Filme, Serien, Musik und mehr',
    memberCount: 234500,
    icon: '🎬'
  }
];

export const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    title: 'Was haltet ihr von den neuen KI-Regulierungen?',
    content: 'Die EU hat neue Gesetze zur KI-Regulierung verabschiedet. Wie seht ihr das?',
    author: mockUsers[0],
    forumId: '1',
    forumName: 'Technologie',
    upvotes: 234,
    downvotes: 12,
    comments: 89,
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    title: 'Klimawandel: Was kann jeder Einzelne tun?',
    content: 'Lasst uns über praktische Tipps zum Klimaschutz im Alltag diskutieren.',
    author: mockUsers[1],
    forumId: '2',
    forumName: 'Wissenschaft',
    upvotes: 567,
    downvotes: 23,
    comments: 234,
    createdAt: new Date(Date.now() - 172800000)
  }
];

export const mockGroupChats: GroupChat[] = [
  {
    id: '1',
    name: 'Familie 👨‍👩‍👧‍👦',
    avatar: '👨‍👩‍👧‍👦',
    members: [mockUsers[4], mockUsers[3]],
    messages: [
      {
        id: '1',
        senderId: '4',
        content: 'Wer kommt am Sonntag zum Essen?',
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        senderId: '5',
        content: 'Ich bin dabei! 🙋‍♂️',
        createdAt: new Date(Date.now() - 1800000)
      }
    ],
    lastMessage: {
      id: '2',
      senderId: '5',
      content: 'Ich bin dabei! 🙋‍♂️',
      createdAt: new Date(Date.now() - 1800000)
    }
  },
  {
    id: '2',
    name: 'Arbeit Team',
    avatar: '💼',
    members: [mockUsers[4], mockUsers[0], mockUsers[1]],
    messages: [
      {
        id: '1',
        senderId: '1',
        content: 'Meeting morgen um 10?',
        createdAt: new Date(Date.now() - 7200000)
      }
    ],
    lastMessage: {
      id: '1',
      senderId: '1',
      content: 'Meeting morgen um 10?',
      createdAt: new Date(Date.now() - 7200000)
    }
  }
];

export const currentUser = mockUsers[4];
