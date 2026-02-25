'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useRegister } from '../hooks/useRegister';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const mutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const data = await mutation.mutateAsync(values);
      setAuth(data.user, data.token, data.refreshToken);
      router.push(ROUTES.DASHBOARD);
    } catch {
      return;
    }
  });

  return (
    <Card className="mx-auto w-full max-w-md border-slate-200/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-900">Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            {(['firstName', 'lastName', 'email', 'password'] as const).map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName === 'firstName'
                        ? 'First Name'
                        : fieldName === 'lastName'
                          ? 'Last Name'
                          : fieldName === 'email'
                            ? 'Email'
                            : 'Password'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={fieldName === 'password' ? 'password' : 'text'}
                        aria-label={fieldName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {mutation.error ? (
              <p className="text-sm text-destructive">{mutation.error.message}</p>
            ) : null}

            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating account...' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
