import {useCallback} from 'react'
import {set, StringInputProps} from 'sanity'
import {Flex, Card, Tooltip, Text} from '@sanity/ui'

const fontSizes = [
  {value: 'small', label: 'S', title: 'Small'},
  {value: 'normal', label: 'M', title: 'Normal'},
  {value: 'large', label: 'L', title: 'Large'},
  {value: 'xlarge', label: 'XL', title: 'Extra Large'},
]

export function FontSizeInput(props: StringInputProps) {
  const {onChange, value = 'normal'} = props

  const handleClick = useCallback(
    (newValue: string) => {
      onChange(set(newValue))
    },
    [onChange]
  )

  return (
    <Flex gap={1}>
      {fontSizes.map((size) => {
        const isSelected = value === size.value
        return (
          <Tooltip
            key={size.value}
            content={<Text size={1}>{size.title}</Text>}
            placement="top"
            portal
          >
            <Card
              as="button"
              type="button"
              onClick={() => handleClick(size.value)}
              padding={2}
              paddingX={3}
              radius={2}
              style={{
                cursor: 'pointer',
                background: isSelected ? 'var(--card-badge-default-bg-color)' : 'transparent',
                border: isSelected ? '2px solid var(--card-focus-ring-color)' : '1px solid var(--card-border-color)',
              }}
            >
              <Text size={1} weight={isSelected ? 'bold' : 'regular'}>
                {size.label}
              </Text>
            </Card>
          </Tooltip>
        )
      })}
    </Flex>
  )
}
