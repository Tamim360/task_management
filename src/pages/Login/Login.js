import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
   
  export default function Login() {
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    // const location = useLocation()
    // const from = location?.state?.from.pathname || '/'
    // console.log(from);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signIn(email, password)
        .then(res => {
          toast.success('Signed in successfully')
          navigate('/')
        })
        .catch(err => console.log(err))
    }
    
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <Card className="max-w-96 mt-6 dark:bg-dark-green">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 grid h-16 place-items-center"
        >
          <Typography variant="h4" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-2">
          <Input className="dark:text-white" name="email" label="Email" size="lg" />
          <Input type="password" className="dark:text-white" name="password" label="Password" size="lg" />
        
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign In
          </Button>
          <SocialLogin/>
          <Typography variant="small" className="mt-6 flex justify-center dark:text-white">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 font-bold text-blue-500"
            >
              Sign up
            </Link>
          </Typography>
        </CardFooter>
        </form>
      </Card>
      </div>
    );
  }