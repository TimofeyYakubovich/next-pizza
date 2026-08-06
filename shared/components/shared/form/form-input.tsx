'use client';

// import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
// import { ClearButton } from '../clear-button';
// import { ErrorText } from '../error-text';
// import { RequiredSymbol } from '../required-symbol';

// компанент заменитель инпута в app\(checkout)\checkout\page.tsx

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {

}