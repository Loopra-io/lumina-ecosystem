import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithPassword } from '@lumina/data-access';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ?? '';
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        const res = await signInWithPassword(email, password);
        if (!res.success)
            return setError(res.error);
        const destination = redirect || '/dashboard';
        if (destination.startsWith('http')) {
            window.location.href = destination;
        }
        else {
            navigate(destination);
        }
    }
    return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Iniciar sesi\u00F3n" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsx("input", { className: "w-full p-3 rounded bg-white/5", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { className: "w-full p-3 rounded bg-white/5", placeholder: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value) }), error && _jsx("div", { className: "text-red-400", children: error }), _jsx("button", { className: "w-full bg-[#00f2ff] text-black font-bold rounded p-3", children: "Entrar" })] })] }));
}
