import { ComponentMeta, ComponentStory } from '@storybook/react'
import { reactQueryProviderDecorator } from 'src/__mocks__/decorators'
import { awardsEmptyMocked, awardsLoadingMocked, awardsQueryMocked } from 'src/__mocks__/mockedAwards'

import AwardSection, { AwardSectionProps } from '../AwardSection'

export default {
  title: 'components/sections/AwardSection',
  component: AwardSection
} as ComponentMeta<typeof AwardSection>

const Template = (args: AwardSectionProps) => <AwardSection {...args} />

export const Primary: ComponentStory<typeof AwardSection> = Template.bind({})
Primary.decorators = [reactQueryProviderDecorator]
Primary.parameters = { msw: { handlers: [awardsQueryMocked] } }

export const Loading: ComponentStory<typeof AwardSection> = Template.bind({})
Loading.decorators = [reactQueryProviderDecorator]
Loading.parameters = { msw: { handlers: [awardsLoadingMocked] } }

export const Empty: ComponentStory<typeof AwardSection> = Template.bind({})
Empty.decorators = [reactQueryProviderDecorator]
Empty.parameters = { msw: { handlers: [awardsEmptyMocked] } }
