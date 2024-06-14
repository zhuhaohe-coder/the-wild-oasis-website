import { signInAction } from "@lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-8 py-3 font-medium bg-slate-600">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://authjs.dev/img/providers/github.svg"
          alt="GitHub logo"
          height="30"
          width="30"
        />
        <span>Continue with GitHub</span>
      </button>
    </form>
  );
}

export default SignInButton;
