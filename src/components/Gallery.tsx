import { useState } from "react";
import { useOverlay, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
      {images.map((img, idx) => (
        <button
          key={idx}
          className="relative aspect-square overflow-hidden w-3/4 rounded-2xl shadow hover:scale-[1.02] transition ml-10 pb-6"
          onClick={() => setSelectedIndex(idx)}
        >
          <img
            src={img.src}
            alt={img.alt}
            className= "border-b-gray-400 border-b-4 object-cover w-full h-full"
          />
        </button>
      ))}

      {selectedIndex !== null && (
        <Lightbox
          image={images[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}


import { useRef } from "react";

type LightboxProps = {
  image: { src: string; alt: string };
  onClose: () => void;
};

function Lightbox({ image, onClose }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(
    { isOpen: true, onClose, isDismissable: true },
    ref
  );
  const { dialogProps } = useDialog({}, ref);

  return (
    <OverlayContainer>
      <div
        {...underlayProps}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      >
        <FocusScope contain autoFocus restoreFocus>
          <div
            ref={ref}
            {...overlayProps}
            {...dialogProps}
            className="relative max-w-6xl w-full p-4"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
}
