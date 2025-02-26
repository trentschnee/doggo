import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { loginFormSchema } from '@/features/auth/schemas/login-form-schema';
import { LoginDTO } from '@/features/auth/types/login-dto';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export const LoginForm: React.FC = () => {
  const { ...form } = useForm<LoginDTO>({ resolver: zodResolver(loginFormSchema), defaultValues: { name: '', email: '' } });
  const { login, isLoggingIn } = useAuth();

  const onSubmit = async (data: LoginDTO) => {
    login(data);
  };
  return <Form {...form}>
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please enter your information to access our list of available dogs</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isLoggingIn ? 'Logging in...' : 'Login'}</Button>
        </form></CardContent>  </Card ></Form>

}