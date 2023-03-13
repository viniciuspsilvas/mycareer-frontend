import { AwardSectionProps } from '@components/sections/AwardSection'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AdminSidebar } from '../AdminSidebar'

export default {
  title: 'components/admin/AdminSidebar',
  component: AdminSidebar
} as ComponentMeta<typeof AdminSidebar>

const Template = (args: AwardSectionProps) => <AdminSidebar {...args} />

export const Primary: ComponentStory<typeof AdminSidebar> = Template.bind({})
