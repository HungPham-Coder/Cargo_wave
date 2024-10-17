// components/withPermission.tsx
import { useRouter } from 'next/navigation';
import { usePermission } from '../contexts/PermissionContext';
import { ReactNode, useEffect } from 'react';
import routes from '../router/routes';

const withPermission = (WrappedComponent: React.ComponentType, requiredRole: string) => {
  return (props: any) => {
    const { hasPermission } = usePermission();
    const router = useRouter();

    useEffect(() => {
      if (!hasPermission(requiredRole)) {
        router.replace(routes.root);
      }
    }, [hasPermission, requiredRole, router]);

    return hasPermission(requiredRole) ? <WrappedComponent {...props} /> : null;
  };
};

export default withPermission;
