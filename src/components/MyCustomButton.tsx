// src/components/MyCustomButton.tsx
import { useButton } from 'react-aria';
import { useRef } from 'react';

export function MyCustomButton(props) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {props.children}
    </button>
  );
}
