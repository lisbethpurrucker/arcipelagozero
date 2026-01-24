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
      <button
        onClick={onToggle}
        className="w-full text-left py-3 sm:py-4 md:py-5 hover:bg-gray-50/30 transition-colors"
      >
        <h3 className="text-sm sm:text-base text-gray-600 font-normal">{member.name}</h3>
      </button>

      {isOpen && hasDetails && (
        <div className="pb-0">
          <div
            className="rounded-none relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/pattern-lines-rotated.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            <div className={`grid grid-cols-1 ${member.photo ? 'md:grid-cols-2' : ''} gap-0 relative`}>
              {/* Bio text */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                {member.bio && (
                  <>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-light mb-3 sm:mb-4 whitespace-pre-wrap">
                      {member.bio}
                    </p>
                    <a
                      href="#"
                      className="text-xs sm:text-sm font-medium text-gray-700 underline hover:no-underline inline-block"
                    >
                      Call to action
                    </a>
                  </>
                )}
              </div>

              {/* Photo */}
              {member.photo && (
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 md:pl-0">
                  <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center overflow-hidden">
                    {member.photo.asset ? (
                      <Image
                        src={member.photo.asset._ref}
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
  const [openMember, setOpenMember] = useState<string | null>(null)

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
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 md:mb-10 text-gray-900 tracking-tight">Members</h1>

      <div className="bg-white">
        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([category, categoryMembers]) => (
            <div key={category} className="mb-6 sm:mb-7 md:mb-8 last:mb-0">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 sm:mb-4 px-0">
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
            <p className="text-xs sm:text-sm text-gray-500">
              No members yet. Add some in Sanity Studio!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}