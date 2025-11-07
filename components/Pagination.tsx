import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages: (number | string)[] = []
  
  // Always show first page
  pages.push(1)
  
  // Show pages around current page
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (pages[pages.length - 1] !== i - 1 && i > 2) {
      pages.push('...')
    }
    pages.push(i)
  }
  
  // Always show last page
  if (totalPages > 1) {
    if (pages[pages.length - 1] !== totalPages - 1 && totalPages > 2) {
      pages.push('...')
    }
    pages.push(totalPages)
  }

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <Link
              key={pageNumber}
              href={pageNumber === 1 ? basePath : `${basePath}?page=${pageNumber}`}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  )
}