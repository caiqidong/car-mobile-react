import type { Meta, StoryObj } from '@storybook/react-vite';
import '@/theme'

import { fn } from 'storybook/test';

import Button from '@/components/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Mini: Story = {
  args: {
   mode: 'fill',
    title: 'Mini Button',
    shape: 'rounded',
    color: 'primary',
    fill: 'solid',
    size: 'mini',
    type: 'button',
  },
};

export const Small: Story = {
  args: {
   mode: 'fill',
    title: 'Small Button',
    shape: 'rounded',
    color: 'primary',
    fill: 'solid',
    size: 'small',
    type: 'button',
  },
};

export const Medium: Story = {
  args: {
    mode: 'fill',
    title: 'Medium Button',
    shape: 'rounded',
    color: 'primary',
    fill: 'solid',
    size: 'medium',
    type: 'button',
  },
};

export const Large: Story = {
  args: {
   mode: 'fill',
    title: 'Large Button',
    shape: 'rounded',
    color: 'primary',
    fill: 'solid',
    size: 'large',
    type: 'button',
  },
};

