'use client';

import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { Textarea } from '../../ui/textarea';
// import { ClearButton } from '../clear-button';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  return (
    <div>
      FormTextarea
    </div>
  )
}