'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Member {
  _id: string
  name: string
  category: string
  bio?: string
  photo?: {
    asset: { _ref: string }
    alt?: string
  }
  order: number
}

// Convert Sanity image reference to CDN URL
function getSanityImageUrl(ref: string): string {
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return ''
  return `https://cdn.sanity.io/images/jpgrzyq0/production/${id}-${dimensions}.${format}`
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
    <div className="border-b border-gray-200 last:border-b-0">
      {!isOpen && (
        <button
          onClick={onToggle}
          className="w-full text-left py-3 sm:py-4 md:py-5 hover:bg-gray-50/30 transition-colors"
        >
          <h3 className="text-sm sm:text-base text-teal-dark font-normal">{member.name}</h3>
        </button>
      )}

      {isOpen && hasDetails && (
        <div className="pb-0 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div
            className="rounded-none relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/pattern-lines-rotated.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            {/* Member name - centered and bold on top */}
            <div className="pt-6 sm:pt-8 md:pt-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <button
                onClick={onToggle}
                className="w-full text-center mb-6 sm:mb-8"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl text-teal-dark font-bold">{member.name}</h3>
              </button>
            </div>

            <div className={`grid grid-cols-1 ${member.photo ? 'md:grid-cols-2' : ''} gap-0 relative max-w-5xl mx-auto`}>
              {/* Bio text */}
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
                {member.bio && (
                  <>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-teal-dark font-light mb-3 sm:mb-4 whitespace-pre-wrap">
                      {member.bio}
                    </p>
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
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10 md:pl-0">
                  <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center overflow-hidden">
                    {member.photo.asset ? (
                      <Image
                        src={getSanityImageUrl(member.photo.asset._ref)}
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
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4 px-0">
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