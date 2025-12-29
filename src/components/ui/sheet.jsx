import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({ side = 'right', children, className = '' }) {
  const positionClasses = {
    right: 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
    left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
    top: 'inset-x-0 top-0 h-auto',
    bottom: 'inset-x-0 bottom-0 h-auto',
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content
        className={`fixed ${positionClasses[side]} z-50 bg-white shadow-lg p-6 ${className}`}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}