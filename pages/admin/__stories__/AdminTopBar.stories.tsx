import AuthProvider from '@lib/AuthProvider'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AdminTopBar, AdminTopBarProps } from '../AdminTopBar'
import { Session } from 'next-auth/core/types'

export default {
  title: 'components/admin/AdminTopBar',
  component: AdminTopBar
} as ComponentMeta<typeof AdminTopBar>

const Template = (args: AdminTopBarProps) => <AdminTopBar {...args} />

export const Primary: ComponentStory<typeof AdminTopBar> = Template.bind({})
Primary.decorators = [
  (Story) => (
    <AuthProvider>
      <Story />
    </AuthProvider>
  )
]
