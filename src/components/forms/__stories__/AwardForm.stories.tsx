import { ComponentMeta, ComponentStory } from '@storybook/react'
import { awards } from 'src/__mocks__/data'
import { AwardForm } from '../AwardForm'

export default {
  title: 'components/forms/AwardForm',
  component: AwardForm
} as ComponentMeta<typeof AwardForm>

const Template: ComponentStory<typeof AwardForm> = (args) => <AwardForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}

export const Editing = Template.bind({})
Editing.args = {
  data: awards.awards[0]
}
