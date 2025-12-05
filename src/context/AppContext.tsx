import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, ContentSettings, Post, Story, ForumThread, GroupChat } from '@/types';
import { currentUser, mockPosts, mockStories, mockForumThreads, mockGroupChats } from '@/data/mockData';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  contentSettings: ContentSettings;
  posts: Post[];
  stories: Story[];
  threads: ForumThread[];
  chats: GroupChat[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateContentSettings: (settings: Partial<ContentSettings>) => void;
  likePost: (postId: string) => void;
  reactToStory: (storyId: string, emoji: string) => void;
  voteThread: (threadId: string, isUpvote: boolean) => void;
  sendMessage: (chatId: string, content: string) => void;
  getFilteredPosts: () => Post[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contentSettings, setContentSettings] = useState<ContentSettings>({
    showReels: true,
    blockAiContent: true,
    algorithmType: 'educational',
    customKeywords: []
  });
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [threads, setThreads] = useState<ForumThread[]>(mockForumThreads);
  const [chats, setChats] = useState<GroupChat[]>(mockGroupChats);

  const login = (username: string, password: string): boolean => {
    if (username && password) {
      setUser(currentUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateContentSettings = (settings: Partial<ContentSettings>) => {
    setContentSettings(prev => ({ ...prev, ...settings }));
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const reactToStory = (storyId: string, emoji: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, reactions: [...story.reactions, { emoji, userId: user?.id || '' }] }
        : story
    ));
  };

  const voteThread = (threadId: string, isUpvote: boolean) => {
    setThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { 
            ...thread, 
            upvotes: isUpvote ? thread.upvotes + 1 : thread.upvotes,
            downvotes: !isUpvote ? thread.downvotes + 1 : thread.downvotes
          }
        : thread
    ));
  };

  const sendMessage = (chatId: string, content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      content,
      createdAt: new Date()
    };
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: newMessage }
        : chat
    ));
  };

  const getFilteredPosts = (): Post[] => {
    let filtered = [...posts];

    // Filter out reels if disabled
    if (!contentSettings.showReels) {
      filtered = filtered.filter(post => post.media?.type !== 'reel');
    }

    // Filter out AI content if blocked
    if (contentSettings.blockAiContent) {
      filtered = filtered.filter(post => !post.media?.isAiGenerated);
    }

    // Filter by algorithm type or custom keywords
    if (contentSettings.algorithmType === 'custom' && contentSettings.customKeywords.length > 0) {
      const keywords = contentSettings.customKeywords.map(k => k.toLowerCase());
      filtered = filtered.filter(post => 
        post.keywords.some(k => keywords.includes(k.toLowerCase()))
      );
    } else if (contentSettings.algorithmType !== 'custom') {
      filtered = filtered.sort((a, b) => {
        if (a.category === contentSettings.algorithmType) return -1;
        if (b.category === contentSettings.algorithmType) return 1;
        return 0;
      });
    }

    return filtered;
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      contentSettings,
      posts,
      stories,
      threads,
      chats,
      login,
      logout,
      updateContentSettings,
      likePost,
      reactToStory,
      voteThread,
      sendMessage,
      getFilteredPosts
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
