'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Student {
  id: string;
  name: string;
  grade: number;
}

const PHONICS_SOUNDS = ['s', 'a', 't', 'i', 'p', 'n'];

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    student_id: '',
    session_date: new Date().toISOString().split('T')[0],
    sfl_existential: 3,
    sfl_relational: 3,
    sfl_material: 3,
    phonics_practiced: [] as string[],
    youtube_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error('Error fetching students:', err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handlePhonicsChange = (sound: string) => {
    setFormData((prev) => ({
      ...prev,
      phonics_practiced: prev.phonics_practiced.includes(sound)
        ? prev.phonics_practiced.filter((s) => s !== sound)
        : [...prev.phonics_practiced, sound],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Laporan Berhasil Disimpan!' });
        setFormData({
          student_id: '',
          session_date: new Date().toISOString().split('T')[0],
          sfl_existential: 3,
          sfl_relational: 3,
          sfl_material: 3,
          phonics_practiced: [],
          youtube_url: '',
        });
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Terjadi kesalahan.' });
      }
    } catch (err) {
      console.error('Error submitting session:', err);
      setMessage({ type: 'error', text: 'Gagal mengirim data. Periksa koneksi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-32">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2D5A27] mb-2">Dashboard Guru</h1>
            <p className="text-gray-600">Catat perkembangan setiap murid di sesi hari ini.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Pilih Murid</label>
              <select
                required
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                className="w-full h-14 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none appearance-none bg-gray-50"
              >
                <option value="">-- Pilih Nama Murid --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Kelas {student.grade})
                  </option>
                ))}
              </select>
            </div>

            {/* SFL Assessment */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Asesmen SFL (1-5)</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'sfl_existential', label: 'Existential (Menamai)', value: formData.sfl_existential },
                  { id: 'sfl_relational', label: 'Relational (Menjelaskan Diri)', value: formData.sfl_relational },
                  { id: 'sfl_material', label: 'Material (Melakukan)', value: formData.sfl_material },
                ].map((sfl) => (
                  <div key={sfl.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">{sfl.label}</label>
                      <span className="text-[#2D5A27] font-bold text-lg">{sfl.value}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      name={sfl.id}
                      value={sfl.value}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2D5A27]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 px-1">
                      <span>Perlu Pendampingan</span>
                      <span>Sangat Mandiri</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phonics Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Daftar Phonics</h3>
              <div className="grid grid-cols-3 gap-3">
                {PHONICS_SOUNDS.map((sound) => (
                  <button
                    key={sound}
                    type="button"
                    onClick={() => handlePhonicsChange(sound)}
                    className={`h-14 rounded-xl font-bold text-lg transition-all ${
                      formData.phonics_practiced.includes(sound)
                        ? 'bg-[#2D5A27] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sound}
                  </button>
                ))}
              </div>
            </div>

            {/* YouTube Spotlight */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">URL YouTube (Unlisted)</label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none bg-gray-50"
              />
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl text-center font-bold ${
                message.type === 'success' ? 'bg-green-100 text-[#2D5A27]' : 'bg-red-100 text-red-600'
              }`}>
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.student_id}
              className="w-full h-16 bg-[#2D5A27] text-white rounded-2xl font-bold text-lg hover:bg-[#23481F] transition-all disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Laporan Sesi'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
