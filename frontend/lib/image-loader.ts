/**
 * Custom image loader for Next.js Image component
 * This handles both development and production image URLs properly
 */

export interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

function imageLoader({ src, width, quality = 75 }: ImageLoaderProps): string {
  // Decode URL-encoded paths so checks work properly
  const decodedSrc = decodeURIComponent(src)
  
  // If it's already a full URL, return as is
  if (decodedSrc.startsWith('http://') || decodedSrc.startsWith('https://')) {
    return decodedSrc
  }
  
  // If it's a relative path starting with /api/media
  if (decodedSrc.startsWith('/api/media/')) {
    // In development, use relative path (will go through Next.js proxy)
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return decodedSrc
    }
    
    // In production, construct full URL to backend
    const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'amir.paymydine.com'
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:'
    return `${protocol}//${currentDomain}${decodedSrc}`
  }
  
  // For other relative paths (like /placeholder.svg), return as is
  return decodedSrc
}

// Export as default function (required by Next.js)
export default imageLoader 