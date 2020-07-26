import { environment } from 'src/environments/environment';
import * as SignUpData from '../../app/auth/signup/signup.component.json';
import * as LoginData from '../../app/auth/login/login.component.json';


export class StaticData {

    public static fetchPostsUrl = `${environment.backendServerURL}/api/posts/`;

    public static signUpUrl = `${environment.backendServerURL}/api/user/signUp`;

    public static loginUrl = `${environment.backendServerURL}/api/user/login`;

    public static loading = 'Loading...';

    public static login = 'Login';

    public static signUp = 'SignUp';

    public static createPostBtn = 'Add Post';
    public static editPostBtn = 'Update Post';

    public static signUpFormData = SignUpData.signUpData.signUpForm;

    public static loginFormData = LoginData.loginData.loginForm;

}
