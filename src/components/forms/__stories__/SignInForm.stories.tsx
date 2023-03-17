import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SignInForm } from '../SignInForm'

export default {
  title: 'components/forms/SignInForm',
  component: SignInForm
} as ComponentMeta<typeof SignInForm>

const Template: ComponentStory<typeof SignInForm> = (args) => <SignInForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
