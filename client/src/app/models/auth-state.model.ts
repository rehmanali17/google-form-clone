import { User } from '@models/user.model';
export interface AuthState {
    isLoggedIn: boolean;
    accessToken: string;
    user: User;
}
