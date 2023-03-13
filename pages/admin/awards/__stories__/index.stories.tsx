import { ComponentMeta, ComponentStory } from '@storybook/react'
import { reactQueryProviderDecorator } from 'src/__mocks__/decorators'
import {
  awardsEmptyMocked,
  awardsLoadingMocked,
  awardsQueryMocked,
  deleteOneAwardMocked
} from 'src/__mocks__/mockedAwards'
import AwardsPage from '../index'

export default {
  title: 'components/admin/award/list',
  component: AwardsPage
} as ComponentMeta<typeof AwardsPage>

const Template = () => <AwardsPage />

export const Primary: ComponentStory<typeof AwardsPage> = Template.bind({})
Primary.decorators = [reactQueryProviderDecorator]
Primary.parameters = { msw: { handlers: [awardsQueryMocked, deleteOneAwardMocked] } }

export const Loading: ComponentStory<typeof AwardsPage> = Template.bind({})
Loading.decorators = [reactQueryProviderDecorator]
Loading.parameters = { msw: { handlers: [awardsLoadingMocked] } }

export const Empty: ComponentStory<typeof AwardsPage> = Template.bind({})
Empty.decorators = [reactQueryProviderDecorator]
Empty.parameters = { msw: { handlers: [awardsEmptyMocked] } }
