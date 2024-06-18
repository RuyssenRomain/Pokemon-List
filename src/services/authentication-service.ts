export default class AuthenticationService {
    static inAuthenticated : boolean =false;

    static login(username: string, password : string ):Promise<boolean> {
        const isAuthenticated = (username === 'pikachu' && password === 'pikachu');

        return new Promise(resolve => {
            setTimeout(() => {
                this.inAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 1000);
        })
    }
}