import React, { useState, useEffect } from 'react';
import '../css/RegistrationPage.css';  
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        phone: '',
        ktp: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(x => x);
        setFormValid(allFieldsFilled && !passwordError && !confirmPasswordError);
    }, [formData, passwordError, confirmPasswordError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValid) return;

        const dataToSend = { username: formData.username, fullname: formData.fullName,
            email: formData.email, phone: formData.phone, ktp: formData.ktp,
            password: formData.password };
        fetch('http://localhost:8989/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Pendaftaran berhasil:', data);
            navigate('/login');
        })
        .catch(error => console.error('Kesalahan dalam pendaftaran:', error));
    };

    useEffect(() => {
        let passwordErrors = [];
        if (formData.password.length < 8) passwordErrors.push("Password harus memiliki minimal 8 karakter.");
        if (!/[A-Z]/.test(formData.password)) passwordErrors.push("Password harus mengandung setidaknya satu huruf besar.");
        if (!/[a-z]/.test(formData.password)) passwordErrors.push("Password harus mengandung setidaknya satu huruf kecil.");
        if (!/[0-9]/.test(formData.password)) passwordErrors.push("Password harus mengandung setidaknya satu angka.");
        if (!/[^A-Za-z0-9]/.test(formData.password)) passwordErrors.push("Password harus mengandung setidaknya satu simbol.");

        setPasswordError(passwordErrors.join(' '));
    }, [formData.password]);

    useEffect(() => {
        setConfirmPasswordError(formData.password !== formData.confirmPassword ? "Password tidak cocok." : "");
    }, [formData.password, formData.confirmPassword]);

    return (
        <div className="mt-5 mb-5">
            <div className="registration-container">
                <h1>Daftarkan Akun Anda</h1>
                <form onSubmit={handleSubmit} className="registration-form">
                    {['username', 'fullName', 'email', 'phone', 'ktp'].map(field => (
                        <div className="input-group" key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="input-group password-group">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                        </button>
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <div className="input-group password-group">
                        <label>Konfirmasi Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}
                        </button>
                        {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                    </div>
                    <button type="submit" disabled={!formValid} className="submit-btn">Daftar</button>
                </form>
            </div>
            <div className="mt-5 mb-0"
                style={{height: "2vh"}}
            ></div>
        </div>
    );
}

export default RegistrationPage;
