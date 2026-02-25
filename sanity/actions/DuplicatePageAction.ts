import {useState} from 'react'
import {CopyIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'

export function DuplicatePageAction(props: any) {
  const {published, draft, type, onComplete} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const {push: pushToast} = useToast()
  const [isCreating, setIsCreating] = useState(false)

  if (type !== 'page') return null

  const doc = draft || published

  return {
    label: isCreating ? 'Duplicating…' : 'Duplicate page',
    icon: CopyIcon,
    disabled: !doc || isCreating,
    onHandle: async () => {
      if (!doc) return
      setIsCreating(true)
      try {
        const {_id, _rev, _createdAt, _updatedAt, ...rest} = doc
        await client.create({
          ...rest,
          _type: 'page',
          title: `Copy of ${rest.title || 'Untitled'}`,
          slug: {current: `copy-of-${rest.slug?.current || 'untitled'}`},
          isPublished: false,
          showInNav: false,
        })
        pushToast({
          status: 'success',
          title: 'Page duplicated',
          description: 'Find the copy in the pages list.',
        })
        onComplete?.()
      } catch (err) {
        pushToast({
          status: 'error',
          title: 'Could not duplicate page',
          description: String(err),
        })
      } finally {
        setIsCreating(false)
      }
    },
  }
}
