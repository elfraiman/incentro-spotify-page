import React, { useEffect, useMemo, useRef } from 'react';
import { Grid, AutoSizer } from 'react-virtualized';

interface VirtualGridProps<T> {
  items: T[];
  rowHeight: number;
  gap: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  onScrollToNewItems?: boolean;
  className?: string;
  minColumnWidth?: number;
  maxColumnWidth?: number;
}

export function VirtualGrid<T>({
  items,
  rowHeight,
  gap,
  renderItem,
  className = "h-full w-full min-h-[600px]",
  minColumnWidth = 300,
  maxColumnWidth = 500
}: VirtualGridProps<T>) {
  const gridRef = useRef<Grid>(null);
  
  const calculateResponsiveConfig = (containerWidth: number) => {
    const availableWidth = containerWidth - gap;
    let columnCount = Math.floor(availableWidth / (minColumnWidth + gap));
    columnCount = Math.max(1, columnCount);
    
    const columnWidth = Math.min(
      (availableWidth - (columnCount - 1) * gap) / columnCount,
      maxColumnWidth
    );

    return { columnCount, columnWidth };
  };

  const Cell = ({ columnIndex, rowIndex, style, key }: any) => {
    const { columnCount, columnWidth } = calculateResponsiveConfig(style.width || 0);
    const itemIndex = rowIndex * columnCount + columnIndex;
    const item = items[itemIndex];

    if (!item) return null;

    return (
      <div
        key={key}
        style={{
          ...style,
          left: style.left + gap / 2,
          top: style.top + gap / 2,
          width: columnWidth - gap,
          height: rowHeight - gap,
        }}
      >
        {renderItem(item, itemIndex)}
      </div>
    );
  };

  if (!items.length) return null;

  return (
    <div className={className}>
      <AutoSizer>
        {({ height, width }) => {
          const { columnCount, columnWidth } = calculateResponsiveConfig(width);
          const rowCount = Math.ceil(items.length / columnCount);

          return (
            <Grid
              className="border-orange-500 border-1 rounded-lg bg-orange-500/5 backdrop-blur-sm shadow-inner"
              ref={gridRef}
              cellRenderer={Cell}
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}