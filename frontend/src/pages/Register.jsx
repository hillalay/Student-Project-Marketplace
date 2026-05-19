import { useState } from "react";
import { Link } from "react-router-dom";
import { register as registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!formData.fullName.trim()) {
      return "Lütfen adınızı ve soyadınızı girin.";
    }

    if (formData.fullName.trim().length < 3) {
      return "Ad soyad alanı en az 3 karakter olmalıdır.";
    }

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

    if (!formData.confirmPassword.trim()) {
      return "Lütfen şifrenizi tekrar girin.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Şifreler birbiriyle eşleşmiyor.";
    }

    if (!formData.acceptedTerms) {
      return "Devam etmek için kullanım koşullarını kabul etmelisiniz.";
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
      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage("Kayıt başarılı. Şimdi giriş yapabilirsiniz.");

      setFormData((previousData) => ({
        ...previousData,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setErrorMessage(error.message || "Kayıt işlemi başarısız oldu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    setErrorMessage(
      "Google ile kayıt özelliği şu an sadece arayüz olarak hazırlandı. OAuth entegrasyonu sonraki aşamada eklenecek.",
    );
    setSuccessMessage("");
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-form-wrapper">
          <div className="register-form-header">
            <span className="register-badge">Yeni hesap oluştur</span>

            <h1>Kayıt Ol</h1>

            <p>
              Proje ilanı oluşturmak, ekip arkadaşı bulmak ve öğrenci
              projelerine başvurmak için hesabını oluştur.
            </p>
          </div>

          {errorMessage && (
            <div className="alert alert-error">{errorMessage}</div>
          )}

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Ad Soyad</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Adınızı ve soyadınızı girin"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

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
                  placeholder="En az 6 karakter"
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifre Tekrar</label>

              <div className="password-field">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Şifrenizi tekrar girin"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((currentValue) => !currentValue)
                  }
                >
                  {showConfirmPassword ? "Gizle" : "Göster"}
                </button>
              </div>
            </div>

            <label className="terms-check">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
              />

              <span>
                Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.
              </span>
            </label>

            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
            </button>
          </form>

          <div className="divider">
            <span>veya</span>
          </div>

          <button
            className="google-button"
            type="button"
            onClick={handleGoogleRegister}
          >
            <span className="google-icon">G</span>
            Google ile devam et
          </button>

          <p className="login-text">
            Zaten hesabın var mı? <Link to="/login">Giriş yap</Link>
          </p>
        </div>

        <div className="register-info">
          <span className="info-label">Neler yapabilirsin?</span>

          <h2>Projeni paylaş, doğru ekip arkadaşlarını bul.</h2>

          <p>
            Student Project Marketplace, öğrencilerin proje fikirlerini
            paylaşmasını, ekip arkadaşı aramasını ve açık projelere başvuru
            yapmasını kolaylaştırır.
          </p>

          <div className="register-benefits">
            <div className="benefit-card benefit-yellow">
              <strong>Proje ilanı oluştur</strong>
              <span>Hangi becerilere ihtiyacın olduğunu açıkça belirt.</span>
            </div>

            <div className="benefit-card benefit-green">
              <strong>Projeleri keşfet</strong>
              <span>İlgine ve becerilerine uygun projeleri incele.</span>
            </div>

            <div className="benefit-card benefit-purple">
              <strong>Başvuru yap</strong>
              <span>Kısa bir mesajla projelere katılmak için başvur.</span>
            </div>

            <div className="benefit-card benefit-blue">
              <strong>Süreci takip et</strong>
              <span>Başvurularının kabul veya red durumunu görüntüle.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
