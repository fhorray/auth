import { CheckCircle } from 'lucide-react';
import { BsExclamationTriangle } from 'react-icons/bs';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="text-emerald-700 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-center">
      <CheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
