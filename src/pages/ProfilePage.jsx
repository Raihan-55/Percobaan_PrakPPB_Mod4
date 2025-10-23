// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const groupInfo = {
    name: "Praktikum PPB Modul 4",
    members: [
      { name: "RAIHAN SAHAJA", nim: "21120123130093" },
      { name: "FAIZ ABDUL HANIF", nim: "21120123140138" },
      { name: "YOSUA KEVAN UNGGUL BUDIHARDJO", nim: "21120123120006" },
      { name: "M. ADNAN ABDU RAFI'A", nim: "21120123130079" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Profile Kelompok
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Group Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {groupInfo.name}
            </h2>
            <p className="text-purple-100">
              Aplikasi Resep Nusantara - Platform resep masakan dan minuman tradisional Indonesia
            </p>
          </div>

          {/* Members List */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Anggota Kelompok
            </h3>
            <div className="grid gap-4 md:gap-6">
              {groupInfo.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {member.name}
                      </h4>
                      <p className="text-gray-600">
                        NIM: {member.nim}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Info
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Teknologi yang Digunakan
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  React
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Vite
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Lucide Icons
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
