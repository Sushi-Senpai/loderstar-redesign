import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Display from "../../../../app/components/account-summary/display";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tender/AccountSummary/Display",
  component: Display,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Display>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Display> = (args) => (
  <Display {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  totalBorrowedUsd: 10000,
  totalSuppliedUsd: 10000,
  netApy: 1000,
  borrowLimitUsed: "1000",
  percentUsed: 10000,
  borrowLimit: 10000,
};
