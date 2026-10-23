import React, { useState } from 'react';

/**
 * Product photos live in Supabase Storage at full upload size. Supabase can resize on the fly,
 * so each spot asks for a copy just big enough (and twice that for sharp phone screens).
 * Photos from anywhere else are used as they are.
 */
const OBJECT_PATH = '/storage/v1/object/public/';
const RENDER_PATH = '/storage/v1/render/image/public/';

const resized = (url: string, width: number) =>
  `${url.replace(OBJECT_PATH, RENDER_PATH)}?width=${width}&quality=72`;

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  /** Display width in CSS pixels at its largest */
  width: number;
}

const ProductImage: React.FC<Props> = ({ src, width, alt = '', loading = 'lazy', ...rest }) => {
  // If resizing ever fails (quota, outage), fall back to the original photo
  const [failed, setFailed] = useState(false);
  const canResize = !failed && src.includes(OBJECT_PATH);

  return (
    <img
      {...rest}
      alt={alt}
      loading={loading}
      decoding="async"
      src={canResize ? resized(src, width) : src}
      srcSet={canResize ? `${resized(src, width)} 1x, ${resized(src, width * 2)} 2x` : undefined}
      onError={canResize ? () => setFailed(true) : undefined}
    />
  );
};

export default ProductImage;
