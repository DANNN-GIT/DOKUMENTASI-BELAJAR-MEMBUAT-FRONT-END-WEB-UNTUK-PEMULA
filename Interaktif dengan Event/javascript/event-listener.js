// ? DOMContentLoaded merupakan event html yang dipanggil ketika dokumen HTML telah selesai load dan parsing tanpa menunggu stylesheets atau css, images, atau subframes selesai diproses.Sedangkan event load merupakan event yang terjadi ketika halaman web telah selesai loading.

document.addEventListener('DOMContentLoaded', function() {
   const inputMaxLengthOnload = document.getElementById('inputNama').maxLength;
   document.getElementById('sisaKarakter').innerText = inputMaxLengthOnload;

   document.getElementById('inputNama').addEventListener('input', function() {
      const jumlahKarakterDiketik = document.getElementById('inputNama').value.length;
      const jumlahKarakterMaksimal = document.getElementById('inputNama').maxLength;

      console.log('jumlahKarakterDiketik: ', jumlahKarakterDiketik);
      console.log('jumlahKarakterMaksimal: ', jumlahKarakterMaksimal);

      const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
      document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();
      
      if (sisaKarakterUpdate == 0) {
         document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai!';
      } else if (sisaKarakterUpdate <= 5) {
         document.getElementById('notifikasiSisaKarakter').style.color = 'red';
      } else {
         document.getElementById('notifikasiSisaKarakter').style.color = 'black';
      }
   });

   document.getElementById('inputNama').addEventListener('focus', function() {
      console.log('inputNama: focus');
      document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible';
   });

   document.getElementById('inputNama').addEventListener('blur', function() {
      console.log('inputNama: blur');
      document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
   });

   document.getElementById('inputCaptcha').addEventListener('change', function() {
      console.log('inputCaptcha: change');
      const inputCaptcha = document.getElementById('inputCaptcha').value;
      const submitButtonStatus = document.getElementById('submitButton');

      if (inputCaptcha === 'PRNU') {
         submitButtonStatus.removeAttribute('disabled');
      }
   });

   document.getElementById('formDataDiri').addEventListener('submit', function(event) {
      const inputCaptcha = document.getElementById('inputCaptcha').value;

      if (inputCaptcha === 'PRNU') {
         alert('Selamat, captcha Anda lolos!');
      } else {
         alert('Hayolo salah!');
         document.getElementById('submitButton').setAttribute('disabled', '');
      }
      event.preventDefault();
   });

   document.getElementById('inputCopy').addEventListener('copy', function() {
      alert('Teks telah disalin!');
   });

   document.getElementById('inputPaste').addEventListener('paste', function() {
      alert('Teks berhasil dipaste!');
   });

});