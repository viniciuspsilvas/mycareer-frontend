import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginForm } from '../LoginForm'

export default {
  title: 'components/forms/LoginForm',
  component: LoginForm
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
