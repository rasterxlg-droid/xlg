import { redirect } from 'next/navigation';

// Корень / → всегда /ru
export default function RootPage() {
  redirect('/ru');
}
