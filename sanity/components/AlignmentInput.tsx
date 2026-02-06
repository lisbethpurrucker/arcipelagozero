import {useCallback} from 'react'
import {set, unset, StringInputProps} from 'sanity'
import {Flex, Card, Tooltip, Text} from '@sanity/ui'
import {AlignLeft, AlignCenter, AlignRight} from 'lucide-react'

const alignments = [
  {value: 'left', icon: AlignLeft, label: 'Left'},
  {value: 'center', icon: AlignCenter, label: 'Center'},
  {value: 'right', icon: AlignRight, label: 'Right'},
]

export function AlignmentInput(props: StringInputProps) {
  const {onChange, value = 'left'} = props

  const handleClick = useCallback(
    (newValue: string) => {
      onChange(set(newValue))
    },
    [onChange]
  )

  return (
    <Flex gap={1}>
      {alignments.map((alignment) => {
        const Icon = alignment.icon
        const isSelected = value === alignment.value
        return (
          <Tooltip
            key={alignment.value}
            content={<Text size={1}>{alignment.label}</Text>}
            placement="top"
            portal
          >
            <Card
              as="button"
              type="button"
              onClick={() => handleClick(alignment.value)}
              padding={2}
              radius={2}
              style={{
                cursor: 'pointer',
                background: isSelected ? 'var(--card-badge-default-bg-color)' : 'transparent',
                border: isSelected ? '2px solid var(--card-focus-ring-color)' : '1px solid var(--card-border-color)',
              }}
            >
              <Icon size={18} strokeWidth={isSelected ? 2.5 : 1.5} />
            </Card>
          </Tooltip>
        )
      })}
    </Flex>
  )
}
