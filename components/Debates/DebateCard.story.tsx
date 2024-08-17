import type { Meta, StoryObj } from '@storybook/react'
import { Container, Grid } from '@mantine/core'
import DebateCard from './DebateCard'

const meta: Meta<typeof DebateCard> = {
  title: 'Debate Card',
  component: DebateCard,
  decorators: [
    (Story) => (
      <Container my="md">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <Story />
          </Grid.Col>
        </Grid>
      </Container>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DebateCard>

export const Primary: Story = {
  args: {
    creatorSub: '0',
    id: 1,
    opponentSub: '1',
    topic: 'War: What is it good for?',
  },
}

export const NoOpponentYet: Story = {
  args: {
    ...Primary.args,
    opponentSub: null,
  },
}

export const YourTurn: Story = {
  args: {
    ...Primary.args,
  },
}

export const CooldownActive: Story = {
  args: {
    ...Primary.args,
  },
}

export const OpponentsTurn: Story = {
  args: {
    ...Primary.args,
  },
}
