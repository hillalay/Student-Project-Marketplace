import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return "Lütfen e-posta adresinizi girin.";
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return "Lütfen geçerli bir e-posta adresi girin.";
    }

    if (!formData.password.trim()) {
      return "Lütfen şifrenizi girin.";
    }

    if (formData.password.length < 6) {
      return "Şifre en az 6 karakter olmalıdır.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage("Giriş başarılı. Oturum açıldı.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setErrorMessage(error.message || "Giriş başarısız oldu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrorMessage(
      "Google ile giriş özelliği şu an sadece arayüz olarak hazırlandı. OAuth entegrasyonu sonraki aşamada eklenecek.",
    );
    setSuccessMessage("");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-info">
          <span className="login-badge">Student Project Marketplace</span>

          <h1>Tekrar hoş geldin</h1>

          <p>
            Proje ilanlarını görüntülemek, başvurularını takip etmek ve ekip
            arkadaşlarınla çalışmaya devam etmek için hesabına giriş yap.
          </p>

          <div className="login-highlights">
            <div className="highlight-item highlight-green">
              <strong>Proje bul</strong>
              <span>İlgini çeken öğrenci projelerini keşfet.</span>
            </div>

            <div className="highlight-item highlight-purple">
              <strong>Başvuruları takip et</strong>
              <span>Yaptığın başvuruların durumunu kontrol et.</span>
            </div>

            <div className="highlight-item highlight-blue">
              <strong>Ekibini yönet</strong>
              <span>Kendi proje ilanlarına gelen başvuruları incele.</span>
            </div>
          </div>
        </div>

        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h2>Giriş Yap</h2>
            <p>Hesabına e-posta ve şifrenle giriş yapabilirsin.</p>
          </div>

          {errorMessage && (
            <div className="alert alert-error">{errorMessage}</div>
          )}

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@ogrenci.edu.tr"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>

              <div className="password-field">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrenizi girin"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                >
                  {showPassword ? "Gizle" : "Göster"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Beni hatırla</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Şifremi unuttum
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="divider">
            <span>veya</span>
          </div>

          <button
            className="google-button"
            type="button"
            onClick={handleGoogleLogin}
          >
            <span className="google-icon">G</span>
            Google ile devam et
          </button>

          <p className="register-text">
            Henüz hesabın yok mu? <Link to="/register">Kayıt ol</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
