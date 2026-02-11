import { ReactElement } from 'react';

/**
 * Tipos TypeScript para las stories de San Valentín
 */

export interface StoryHeader {
  heading: string;
  profileImage?: string;
  subheading?: string;
}

export interface StoryImage {
  url: string;
  duration?: number;
  header?: StoryHeader;
}

export interface StoryContent {
  content: (props: any) => ReactElement;
  duration?: number;
  header?: StoryHeader;
}

export type Story = StoryImage | StoryContent;

export interface ValentineStoryConfig {
  stories: Story[];
  defaultInterval?: number;
  loop?: boolean;
  keyboardNavigation?: boolean;
  width?: string;
  height?: string;
}
