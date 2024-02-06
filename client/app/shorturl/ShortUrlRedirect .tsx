import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const ShortUrlRedirect: React.FC = () => {
  const router = useRouter();
  const { urlCode } = router.query;
  const serverBaseUrl = process.env.NEXT_PUBLIC_APP_URI;

  const redirect = () => {
    if (urlCode) {
      let url = `${serverBaseUrl}/${urlCode}`;
      window.location.replace(url);
    }
  };
  useEffect(() => {
    redirect();
  }, [urlCode]);

  return (
    <div>
      <Typography variant="h3" gutterBottom style={{ margin: '3% 0% 2% 0%' }}>
        Redirecting...
      </Typography>
    </div>
  );
};

export default ShortUrlRedirect;
