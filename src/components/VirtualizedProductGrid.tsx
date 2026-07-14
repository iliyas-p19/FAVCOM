'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface VirtualizedProductGridProps {
  products: Product[];
  itemsPerRow?: number;
  itemHeight?: number;
  containerHeight?: number;
  onAddToWishlist?: (product: Product) => void;
  onRemoveFromWishlist?: (product: Product) => void;
}

export default function VirtualizedProductGrid({
  products,
  itemsPerRow = 4,
  itemHeight = 400,
  containerHeight = 600,
  onAddToWishlist,
  onRemoveFromWishlist
}: VirtualizedProductGridProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const rowHeight = itemHeight + 24; // item height + gap
    const startIndex = Math.floor(scrollTop / rowHeight) * itemsPerRow;
    const endIndex = Math.min(
      startIndex + Math.ceil((containerHeight / rowHeight) + 1) * itemsPerRow,
      products.length
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, itemHeight, itemsPerRow, products.length]);

  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [products, visibleRange]);

  // Calculate total height
  const totalHeight = Math.ceil(products.length / itemsPerRow) * (itemHeight + 24);

  // Handle scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate item width based on container width
  const itemWidth = containerWidth > 0 ? (containerWidth - (itemsPerRow - 1) * 24) / itemsPerRow : 300;

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: Math.floor(visibleRange.startIndex / itemsPerRow) * (itemHeight + 24),
            left: 0,
            right: 0,
          }}
        >
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
            }}
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
              >
                <ProductCard
                  product={product}
                  onAddToWishlist={onAddToWishlist}
                  onRemoveFromWishlist={onRemoveFromWishlist}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
