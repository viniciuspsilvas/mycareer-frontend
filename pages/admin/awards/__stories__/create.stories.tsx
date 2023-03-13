import { ComponentMeta, ComponentStory } from '@storybook/react'
import { reactQueryProviderDecorator } from 'src/__mocks__/decorators'
import { createOneAwardMocked } from 'src/__mocks__/mockedAwards'
import AwardPage from '../create'

export default {
  title: 'components/admin/award/create',
  component: AwardPage
} as ComponentMeta<typeof AwardPage>

const Template = () => <AwardPage />

export const Primary: ComponentStory<typeof AwardPage> = Template.bind({})
Primary.decorators = [reactQueryProviderDecorator]
Primary.parameters = {
  msw: { handlers: [createOneAwardMocked] }
}
