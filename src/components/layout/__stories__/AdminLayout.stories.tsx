import { ComponentMeta, ComponentStory } from '@storybook/react'
import { decorators } from 'src/__mocks__/decorators'
import { AdminLayout, AdminLayoutProps } from '../AdminLayout'

export default {
  title: 'components/admin/AdminLayout',
  component: AdminLayout
} as ComponentMeta<typeof AdminLayout>

const Template = (args: AdminLayoutProps) => <AdminLayout {...args} />

export const Primary: ComponentStory<typeof AdminLayout> = Template.bind({})
Primary.decorators = decorators
