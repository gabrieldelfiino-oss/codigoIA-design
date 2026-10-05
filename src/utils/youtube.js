// Helpers para trabajar con links de YouTube guardados en programas.json

export function getYoutubeId(url) {
  if (!url) return null
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]
  return null
}

export function getYoutubeThumbnail(url, quality = 'hqdefault') {
  const id = getYoutubeId(url)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`
}

export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeId(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}`
}
