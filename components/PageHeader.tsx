interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold mb-3 text-gray-900 tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}