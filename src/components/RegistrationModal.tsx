'use client';

import React, { useState } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    student_name: '',
    student_grade: '1',
    english_experience: 'Pemula',
    parent_name: '',
    whatsapp_number: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && formData.student_name) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal mengirim data. Periksa koneksi Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#2D5A27] mb-2">
                  {step === 1 ? 'Data Anak' : 'Data Kontak'}
                </h2>
                <div className="flex gap-2">
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#2D5A27]' : 'bg-gray-200'}`} />
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#2D5A27]' : 'bg-gray-200'}`} />
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap Anak</label>
                    <input
                      required
                      type="text"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                      placeholder="Contoh: Andi Pratama"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kelas (SD)</label>
                    <select
                      name="student_grade"
                      value={formData.student_grade}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={g}>Kelas {g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman Bahasa Inggris</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Pemula', 'Menengah', 'Lanjut'].map((exp) => (
                        <label key={exp} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="english_experience"
                            value={exp}
                            checked={formData.english_experience === exp}
                            onChange={handleChange}
                            className="text-[#2D5A27] focus:ring-[#2D5A27]"
                          />
                          <span className="ml-2 text-sm text-gray-700">{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.student_name}
                    className="w-full bg-[#2D5A27] text-white py-3 rounded-xl font-bold hover:bg-[#23481F] transition-colors disabled:opacity-50 mt-6"
                  >
                    Lanjut Ke Kontak
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua</label>
                    <input
                      required
                      type="text"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      placeholder="Contoh: Ibu Siti"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input
                      required
                      type="tel"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="0812XXXXXXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.parent_name || !formData.whatsapp_number}
                      className="flex-2 bg-[#2D5A27] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#23481F] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#2D5A27] mb-2">Terima Kasih!</h2>
              <p className="text-gray-600 mb-8">
                Data Anda sudah kami terima. Kami akan segera menghubungi Bapak/Ibu <strong>{formData.parent_name}</strong> melalui WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-[#2D5A27] text-white py-3 rounded-xl font-bold hover:bg-[#23481F] transition-colors"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
