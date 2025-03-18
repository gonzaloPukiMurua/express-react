import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, errors } = useAuth();

  const onSubmit = (data) => signup(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {errors.map((err, i) => (
          <p key={i} className="text-red-500 text-sm mb-2">{err}</p>
        ))}
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          className="input mb-4"
        />
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
        <input
          type="text"
          {...register("phone")}
          placeholder="Phone"
          className="input mb-4"
        />
        <input
          type="text"
          {...register("country")}
          placeholder="Country"
          className="input mb-4"
        />
        <input
          type="text"
          {...register("address")}
          placeholder="Address"
          className="input mb-4"
        />
        <input
          type="text"
          {...register("city")}
          placeholder="City"
          className="input mb-4"
        />
        <button type="submit" className="btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
}
