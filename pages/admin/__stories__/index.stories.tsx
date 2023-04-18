import { ComponentMeta, ComponentStory } from '@storybook/react'
import { getMeQueryMocked } from 'src/__mocks__/mockedGetMe'
import { nextAuthMocked } from 'src/__mocks__/mockedNextAuth'
import AdminPage from '../index'

export default {
  title: 'pages/admin/index',
  component: AdminPage
} as ComponentMeta<typeof AdminPage>

const Template = () => <AdminPage />

export const Primary: ComponentStory<typeof AdminPage> = Template.bind({})
Primary.parameters = { msw: { handlers: [nextAuthMocked, getMeQueryMocked] } }
