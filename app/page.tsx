import { AuthForm } from "@/components/auth-form"

export default function Home() {
  // In a real app, we would check if the user is authenticated
  // const isAuthenticated = await checkAuth()
  // if (isAuthenticated) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">StudySpark</h1>
          <p className="mt-2 text-lg text-gray-600">定期テストに向けて効果的に学習しよう</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
