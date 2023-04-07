import { ComponentMeta, ComponentStory } from '@storybook/react'
import { decorators } from 'src/__mocks__/decorators'
import { awardQueryErrorMocked, awardQueryMocked, updateOneAwardMocked } from 'src/__mocks__/mockedAwards'
import EditAwardPage from '../edit'

export default {
  title: 'components/admin/award/edit',
  component: EditAwardPage
} as ComponentMeta<typeof EditAwardPage>

const Template = () => <EditAwardPage />

export const Primary: ComponentStory<typeof EditAwardPage> = Template.bind({})
Primary.decorators = decorators
Primary.parameters = {
  msw: { handlers: [awardQueryMocked, updateOneAwardMocked] },
  nextRouter: {
    path: '/admin/awards/[id]/edit',
    asPath: '/admin/awards/1/edit',
    query: {
      id: '1'
    }
  }
}

export const Error: ComponentStory<typeof EditAwardPage> = Template.bind({})
Error.decorators = decorators
Error.parameters = {
  msw: { handlers: [awardQueryErrorMocked] },
  nextRouter: {
    path: '/admin/awards/[id]/edit',
    asPath: '/admin/awards/1/edit',
    query: {
      id: '1'
    }
  }
}
