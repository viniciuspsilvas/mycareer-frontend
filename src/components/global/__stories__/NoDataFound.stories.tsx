import { NoDataFound, NoDataFoundProps } from '../NoDataFound'
import { Meta, Story } from '@storybook/react'
import React from 'react'

export default {
  title: 'global/NoDataFound',
  component: NoDataFound
} as Meta

export const Default: Story<NoDataFoundProps> = () => <NoDataFound />

export const Custom: Story<NoDataFoundProps> = () => <NoDataFound text="Customized text for No Found" />
