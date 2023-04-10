import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  awardsEmptyMocked,
  awardsLoadingMocked,
  awardsQueryMocked,
  deleteOneAwardMocked
} from 'src/__mocks__/mockedAwards'
import AwardsPage from '../index'
import { nextAuthMocked } from 'src/__mocks__/mockedNextAuth'

export default {
  title: 'pages/admin/award/list',
  component: AwardsPage
} as ComponentMeta<typeof AwardsPage>

const Template = () => <AwardsPage />

export const Primary: ComponentStory<typeof AwardsPage> = Template.bind({})
Primary.parameters = { msw: { handlers: [nextAuthMocked, awardsQueryMocked, deleteOneAwardMocked] } }

export const Loading: ComponentStory<typeof AwardsPage> = Template.bind({})
Loading.parameters = { msw: { handlers: [awardsLoadingMocked] } }

export const Empty: ComponentStory<typeof AwardsPage> = Template.bind({})
Empty.parameters = { msw: { handlers: [awardsEmptyMocked] } }
