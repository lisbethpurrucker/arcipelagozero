interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-gray-900 tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}