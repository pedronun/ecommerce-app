import { ReactNode } from 'react';

export type BottomSheetSnapPoint = 'full' | 'half' | 'quarter' | number;

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  snapPoint?: BottomSheetSnapPoint;
  children: ReactNode;
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
}
