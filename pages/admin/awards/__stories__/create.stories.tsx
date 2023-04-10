import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createOneAwardMocked } from 'src/__mocks__/mockedAwards'
import AwardPage from '../create'

export default {
  title: 'pages/admin/award/create',
  component: AwardPage
} as ComponentMeta<typeof AwardPage>

const Template = () => <AwardPage />

export const Primary: ComponentStory<typeof AwardPage> = Template.bind({})
Primary.parameters = {
  msw: { handlers: [createOneAwardMocked] }
}
