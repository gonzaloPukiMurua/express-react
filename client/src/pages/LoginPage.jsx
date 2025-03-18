import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin, errors } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    signin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {errors.map((err, i) => (
          <p key={i} className="text-red-500 text-sm mb-2">{err}</p>
        ))}
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="input mb-4"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="input mb-4"
        />
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
}
