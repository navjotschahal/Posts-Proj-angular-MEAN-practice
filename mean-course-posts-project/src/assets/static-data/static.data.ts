import { environment } from 'src/environments/environment';

export class StaticData {

    public static fetchPostsUrl = `${environment.backendServerURL}/api/posts/`;

    public static loading = 'Loading...';

    public static login = 'Login';

    public static signUp = 'SignUp';

}
