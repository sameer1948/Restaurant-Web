export interface User {
    username: string;
    password: string; 
    roles: string; 
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired : boolean;
    enabled : boolean;
}