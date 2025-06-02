export function Card({ title, description, children }) {
  return (
    <div className="bg-gray-900 border-gray-800 rounded-lg border overflow-hidden">
      <div className="p-4 pb-2">
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
