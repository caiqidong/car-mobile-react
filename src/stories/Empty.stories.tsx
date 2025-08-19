import type { Meta, StoryObj } from "@storybook/react-vite";

import Empty from "@/components/empty";
import Button from "@/components/button";

const meta = {
  title: "Example/Empty",
  component: Empty,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
  argTypes: {
    children: {
      control: false,
    },
    containerStyle: {
      description: "容器样式，应用于最外层 div",
    },
    imageStyle: {
      description: "图片样式，应用于图片元素",
    },
    "--image-width-full-page": {
      description: "整页模式下的图片宽度",
      table: {
        defaultValue: { summary: "auto" },
      },
      control: false,
    },
    "--image-height-full-page": {
      description: "整页模式下的图片高度",
      table: {
        defaultValue: { summary: "100px" },
      },
      control: false,
    },
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    description: "no data",
    image: Empty.Images.Empty,
    imageStyle: { width: 100, height: 100 },
    children: <Button label="action" />,
  },
};

export const EmptyBox: Story = {
  args: {
    description: "no data",
    image: Empty.Images.EmptyBox,
    imageStyle: { width: 100, height: 100 },
  },
};

export const Error: Story = {
  args: {
    description: "no data",
    image: Empty.Images.Error,
    imageStyle: { width: 100, height: 100 },
  },
};

export const Lock: Story = {
  args: {
    description: "no data",
    image: Empty.Images.Lock,
    imageStyle: { width: 100, height: 100 },
  },
};

export const Waiting: Story = {
  args: {
    description: "no data",
    image: Empty.Images.Waiting,
    imageStyle: { width: 100, height: 100 },
  },
};

export const Notice: Story = {
  args: {
    description: "no data",
    image: Empty.Images.Notice,
    imageStyle: { width: 100, height: 100 },
  },
};
