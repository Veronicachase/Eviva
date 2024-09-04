
import RegisterForm from '../../components/loginAndRegisterComponents/RegisterForm'; 
import  LoginForm from '../../components/loginAndRegisterComponents/LoginForm'; 

export default function Login() {
  return (
    <>
      <div className="container grid">
        <div className="register">
          <RegisterForm />
        </div>
        <div className="login">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
