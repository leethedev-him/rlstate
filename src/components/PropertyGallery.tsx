"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { PropertyImage } from "@/types/database"

interface PropertyGalleryProps {
  images: PropertyImage[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    )
  }

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order)

  function goTo(index: number) {
    setCurrentIndex((index + sorted.length) % sorted.length)
  }

  return (
    <>
      <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
        <Image
          src={sorted[currentIndex].image_url}
          alt={`Property image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          className="object-cover cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {sorted.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={() => goTo(currentIndex - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={() => goTo(currentIndex + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {sorted.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === currentIndex ? "bg-primary" : "bg-primary/40",
              )}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      {sorted.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-2">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "aspect-[4/3] rounded-md overflow-hidden border-2 transition-colors relative",
                i === currentIndex ? "border-primary" : "border-transparent",
              )}
            >
              <Image
                src={img.image_url}
                alt=""
                fill
                sizes="(max-width: 768px) 20vw, 10vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Image
            src={sorted[currentIndex].image_url}
            alt=""
            fill
            sizes="90vw"
            className="object-contain"
          />

          {sorted.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(currentIndex - 1)
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(currentIndex + 1)
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  )
}
