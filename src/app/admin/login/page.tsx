import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login — Jola Estates" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Jola Estates</h1>
          <p className="text-gray-500 mt-1">Admin Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
