export const pertanianData = {
    petaniData: [
        { tanaman: "Padi", jumlah: 25 },
        { tanaman: "Jagung", jumlah: 15 },
        { tanaman: "Kedelai", jumlah: 10 },
        { tanaman: "Umbi", jumlah: 8 },
        { tanaman: "Cabai", jumlah: 12 },
        { tanaman: "Tomat", jumlah: 5 },
        { tanaman: "Wortel", jumlah: 7 },
        { tanaman: "Bawang", jumlah: 6 },
        { tanaman: "Sawi", jumlah: 4 },
        { tanaman: "Bayam", jumlah: 3 },
        { tanaman: "Kangkung", jumlah: 5 },
    ],
    dataPertanian: [
        {
          jenisTanaman: "Padi",
          luasLahan: 2.5,
          hasilPanen: 3000,
          kondisiCuaca: "Hujan",
          tanggal: "2024-11-01",
          namaLahan: "Lahan 1",
          jenisTanamanLahan: "Padi",
          luasLahanStr: "2 Ha", // Anda dapat menggunakan string ini untuk tampilan jika diperlukan
          totalPanenStr: "200 kg", // Sama seperti luasLahanStr
        },
        {
            jenisTanaman: "Padi",
            luasLahan: 2.5,
            hasilPanen: 3000,
            kondisiCuaca: "Hujan",
            tanggal: "2024-01-01",
            namaLahan: "Lahan 1",
            jenisTanamanLahan: "Padi",
            luasLahanStr: "2 Ha", // Anda dapat menggunakan string ini untuk tampilan jika diperlukan
            totalPanenStr: "200 kg", // Sama seperti luasLahanStr
          },
        {
          jenisTanaman: "Jagung",
          luasLahan: 1.2,
          hasilPanen: 800,
          kondisiCuaca: "Cerah",
          tanggal: "2024-11-02",
          namaLahan: "Lahan 2",
          jenisTanamanLahan: "Jagung",
          luasLahanStr: "1.5 Ha",
          totalPanenStr: "150 kg",
        },
        {
          jenisTanaman: "Kedelai",
          luasLahan: 1.0,
          hasilPanen: 500,
          kondisiCuaca: "Mendung",
          tanggal: "2024-11-03",
          namaLahan: "Lahan 3",
          jenisTanamanLahan: "Kedelai",
          luasLahanStr: "1 Ha",
          totalPanenStr: "100 kg",
        },
        {
          jenisTanaman: "Kacang Tanah",
          luasLahan: 0.8,
          hasilPanen: 300,
          kondisiCuaca: "Cerah",
          tanggal: "2024-11-04",
          namaLahan: "Lahan 4",
          jenisTanamanLahan: "Kacang Tanah",
          luasLahanStr: "0.8 Ha",
          totalPanenStr: "80 kg",
        },
        {
          jenisTanaman: "Kentang",
          luasLahan: 0.5,
          hasilPanen: 200,
          kondisiCuaca: "Hujan",
          tanggal: "2024-11-05",
          namaLahan: "Lahan 5",
          jenisTanamanLahan: "Kentang",
          luasLahanStr: "0.5 Ha",
          totalPanenStr: "50 kg",
        },
      ]
      ,
    post: [
        { nama: 'Budi', tanggal: '2021-10-10', title: 'Pertanian Organik', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo ac purus ullamcorper fermentum. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies.' },
        { nama: 'Cahya', tanggal: '2021-10-11', title: 'Pertanian Hidroponik', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo ac purus ullamcorper fermentum. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies.' },
        { nama: 'Dewi', tanggal: '2021-10-12', title: 'Pertanian Konvensional', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo ac purus ullamcorper fermentum. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies. Nulla facilisi. Nullam nec libero in eros vehicula aliquet. Cras sit amet libero nec nunc convallis ultricies.' },
        { nama: 'Eka', tanggal: '2021-10-13', title: 'Pertanian Modern', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo ac purus ullamcorper fermentum. Nulla facilisi. Nullam nec libero' },
    ],
    tanaman: [
        {
            nama: "Padi",
            gambar: "/Tanaman.jpg",
            deskripsi: "Padi adalah tanaman pangan pokok bagi sebagian besar penduduk Indonesia. Padi merupakan tanaman yang memerlukan air yang cukup banyak untuk pertumbuhannya. Padi biasanya ditanam di sawah yang memerlukan air yang cukup banyak untuk pertumbuhannya.",
            kondisiTanah: "basah"
        },
        {
            nama: "Jagung",
            gambar: "https://cdn.pixabay.com/photo",
            deskripsi: "Jagung adalah tanaman pangan pokok bagi sebagian besar penduduk Indonesia. Jagung merupakan tanaman yang memerlukan kondisi tanah yang tidak terlalu basah.",
            kondisiTanah: "kering"
        },
        {
            nama: "Kedelai",
            gambar: "https://cdn.pixabay.com/photo",
            deskripsi: "Kedelai adalah tanaman yang cocok untuk kondisi tanah lembab dan tidak terlalu basah.",
            kondisiTanah: "lembab"
        },
    ],

};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
