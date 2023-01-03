import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';

type Props = {
    redirect: string;
}

const ProtectedRoute: FC<Props> = ({ redirect }: Props) => {

    const user = useAppSelector((state) => state.auth.user);

    // Redirect if user not authenticated
    if (!user.id) {
        return <Navigate to={redirect} replace />
    }

    return <Outlet />
}

export default ProtectedRoute;