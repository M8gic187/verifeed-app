export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
  bio?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media?: {
    type: 'image' | 'video' | 'reel';
    url: string;
    isAiGenerated?: boolean;
  };
  sources?: string[];
  likes: number;
  commentCount: number;
  commentsList: Comment[];
  shares: number;
  createdAt: Date;
  isFlagged?: boolean;
  flagReason?: string;
  category: 'educational' | 'fun' | 'other';
  keywords: string[];
}

export interface Story {
  id: string;
  author: User;
  media: {
    type: 'image' | 'video';
    url: string;
  };
  reactions: { emoji: string; userId: string }[];
  createdAt: Date;
  expiresAt: Date;
  viewed: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: User;
  forumId: string;
  forumName: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  createdAt: Date;
  sharedPost?: Post;
}

export interface Forum {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  sharedPost?: Post;
  createdAt: Date;
}

export interface GroupChat {
  id: string;
  name: string;
  avatar: string;
  members: User[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
}

export interface ContentSettings {
  showReels: boolean;
  blockAiContent: boolean;
  algorithmType: 'educational' | 'fun' | 'other' | 'custom';
  customKeywords: string[];
}

export interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  contentSettings: ContentSettings;
}
