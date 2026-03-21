'use client';

import React, { useState } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    student_name: '',
    student_grade: '1',
    parent_name: '',
    whatsapp_number: '',
    student_address: '',
    student_dob: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      console.error('Registration error:', err);
      setError('Gagal mengirim data. Periksa koneksi Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleOverlayClick}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative transition-all duration-300 transform opacity-100 scale-100">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#2D5A27] mb-2">Formulir Pendaftaran</h2>
                <p className="text-sm text-gray-600">Lengkapi data di bawah ini untuk mendaftarkan anak Anda.</p>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input
                  required
                  type="text"
                  name="student_address"
                  value={formData.student_address}
                  onChange={handleChange}
                  placeholder="Contoh: Jl. Raya Puncak No. 123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input
                  required
                  type="date"
                  name="student_dob"
                  value={formData.student_dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none"
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting || !formData.student_name || !formData.parent_name || !formData.whatsapp_number || !formData.student_address || !formData.student_dob}
                className="w-full bg-[#2D5A27] text-white py-3 rounded-xl font-bold hover:bg-[#23481F] transition-colors disabled:opacity-50 mt-6"
              >
                {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
              </button>
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
