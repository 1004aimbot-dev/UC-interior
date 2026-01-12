import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useMobileRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth <= 768;
            const isHomePage = location.pathname === '/';
            // const isMobilePage = location.pathname === '/m';

            // PC -> Mobile redirect (only from root)
            if (isMobile && isHomePage) {
                navigate('/m', { replace: true });
            }
            // Mobile -> PC redirect (optional, strict separation)
            // Currently per requirements: "Directly access /m on PC -> Should load mobile view"
            // So we don't force redirect back to desktop from /m unless desired.
            // But we SHOULD ensure that if we resizing to Desktop while on /m, we might want to go back to / ?
            // The requirement says: "Mobile users visiting / are redirected to /m".
            // It doesn't explicitly say "Desktop users visiting /m are redirected to /".
            // However, usually it's good practice. For now, let's stick to the core requirement.
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [navigate, location]);
};
