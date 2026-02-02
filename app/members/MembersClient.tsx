'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      const isEmpty = !value?.children?.some((child: any) => child.text?.trim())
      if (isEmpty) return <div className="h-3" />
      return <p className="mb-3 last:mb-0">{children}</p>
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-teal-dark underline hover:no-underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

interface Member {
  _id: string
  name: string
  category: string
  bio?: any
  photo?: {
    asset: { _ref: string }
    alt?: string
  }
  order: number
}

function MemberItem({ 
  member, 
  isOpen, 
  onToggle 
}: { 
  member: Member
  isOpen: boolean
  onToggle: () => void 
}) {
  const hasDetails = member.bio || member.photo

  return (
    <div>
      {/* Closed state OR open without details - name only */}
      {(!isOpen || (isOpen && !hasDetails)) && (
        <button
          onClick={onToggle}
          className="w-full text-center py-3 sm:py-4 md:py-5"
        >
          <h3 className={`text-sm sm:text-base text-teal-dark ${isOpen ? 'font-bold' : 'font-normal'}`}>
            {member.name}
          </h3>
        </button>
      )}

      {/* Expanded state with details - full width with name inside */}
      {isOpen && hasDetails && (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/pattern-lines-rotated.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            {/* Name inside expanded area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <button
                onClick={onToggle}
                className="w-full text-center py-3 sm:py-4 md:py-5"
              >
                <h3 className="text-sm sm:text-base text-teal-dark font-bold">
                  {member.name}
                </h3>
              </button>
            </div>

            <div className={`grid grid-cols-1 ${member.photo ? 'md:grid-cols-2' : ''} gap-0 max-w-5xl mx-auto pb-6 sm:pb-8 md:pb-10`}>
              {/* Bio text */}
              <div className={`px-4 sm:px-6 md:px-8 lg:px-12 ${member.photo ? 'mb-6 md:mb-0' : ''}`}>
                {member.bio && (
                  <>
                    <div className="text-sm sm:text-base md:text-lg leading-relaxed text-teal-dark font-light mb-3 sm:mb-4">
                      {Array.isArray(member.bio)
                        ? <PortableText value={member.bio} components={portableTextComponents} />
                        : <p className="whitespace-pre-wrap">{member.bio}</p>
                      }
                    </div>
                    <a
                      href="#"
                      className="text-sm sm:text-base font-medium text-teal-dark underline hover:no-underline inline-block"
                    >
                      Call to action
                    </a>
                  </>
                )}
              </div>

              {/* Photo */}
              {member.photo && (
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 md:pl-0">
                  <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center overflow-hidden">
                    {member.photo.asset ? (
                      <Image
                        src={urlFor(member.photo).width(400).fit('crop').url()}
                        alt={member.photo.alt || member.name}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-white text-xs sm:text-sm font-light">Personal Photo</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MembersPage({
  members
}: {
  members: Member[]
}) {
  const [openMember, setOpenMember] = useState<string | null>(
    members[0]?._id || null
  )

  // Group members by category
  const categories = members.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = []
    }
    acc[member.category].push(member)
    return acc
  }, {} as Record<string, Member[]>)

  return (
    <div>
      <div className="bg-white">
        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([category, categoryMembers]) => (
            <div key={category} className="mb-6 sm:mb-7 md:mb-8 last:mb-0">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4 text-center">
                {category}
              </h2>
              <div>
                {categoryMembers
                  .sort((a, b) => a.order - b.order)
                  .map((member) => (
                    <MemberItem
                      key={member._id}
                      member={member}
                      isOpen={openMember === member._id}
                      onToggle={() => setOpenMember(openMember === member._id ? null : member._id)}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <p className="text-xs sm:text-sm text-teal-dark">
              No members yet. Add some in Sanity Studio!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}