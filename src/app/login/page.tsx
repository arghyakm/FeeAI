import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
             <Logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to FeeAI</CardTitle>
          <CardDescription className="text-lg">
            Login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <KeyRound className="h-4 w-4" />
            <AlertTitle>Demo Credentials</AlertTitle>
            <AlertDescription>
              <p>Email: <span className="font-semibold">student@test.com</span></p>
              <p>Password: <span className="font-semibold">password</span></p>
            </AlertDescription>
          </Alert>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
