import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadProductImage } from '../../services/api'
import toast from 'react-hot-toast'

export default function ImageUpload({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = async (files) => {
    if (!files?.length) return
    setUploading(true)
    try {
      const urls = [...images]
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue
        const url = await uploadProductImage(file)
        urls.push(url)
      }
      onChange(urls)
      toast.success('Image(s) uploaded')
    } catch (err) {
      toast.error(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const remove = (index) => onChange(images.filter((_, i) => i !== index))

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging ? 'border-accent bg-accent/5' : 'border-stone-300 dark:border-stone-600'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <Loader2 className="mx-auto animate-spin text-accent" size={32} />
        ) : (
          <>
            <Upload className="mx-auto text-stone-400 mb-2" size={32} />
            <p className="text-sm text-stone-500">Drag & drop images, or click to browse</p>
          </>
        )}
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative aspect-square rounded-lg overflow-hidden group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => remove(i)} className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
