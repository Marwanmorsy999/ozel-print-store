import { useEffect } from 'react';

export function useArabic() {
  useEffect(() => {
    // تفعيل العربية على كل الموقع
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';

    // optional: class for styling if needed
    document.body.classList.add('arabic-mode');
  }, []);
}