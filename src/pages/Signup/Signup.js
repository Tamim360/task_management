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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
   
  export default function Signup() {
    
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    
    const imgBBapi = 'a969a4eb171cf53f375738682f6101cf'
    const imgBBurl = `https://api.imgbb.com/1/upload?key=${imgBBapi}`
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photo = form.photo.files[0]
        // console.log(name, email, password, photo);

        const formData = new FormData()
        formData.append('image', photo)

        createUser(email, password)
        .then(res => {
            const user = res.user
            console.log(user);
            fetch(imgBBurl, {
                method: 'POST',
                body: formData
              })
              .then(res => res.json())
              .then(data => {
                if(data.data.url){
                    // create user profile
                    const profile = {
                        displayName: name,
                        photoURL: data.data.url,
                    };

                    updateUserProfile(profile)
                    .then(res => {})
                    .catch(err => {})
                }
              })
              toast.success('user created in successfully')
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
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-2">
          <Input className="dark:text-white" type="text" name="name" label="Name" size="lg" required />
          <Input className="dark:text-white" type="email" name="email" label="Email" size="lg" required />
          <Input className="dark:text-white" type="password" name="password" label="Password" size="lg" required />
          <Input className="dark:text-white" name="photo" type="file" label="Photo" size="lg" />
        
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign Up
          </Button>
          <SocialLogin/>
          <Typography variant="small" className="mt-6 flex justify-center dark:text-white">
            Already have an account?
            <Link
              as="a"
              to="/login"
              className="ml-1 font-bold text-blue-500"
            >
              Sign In
            </Link>
          </Typography>
        </CardFooter>
        </form>
      </Card>
      </div>
    );
  }