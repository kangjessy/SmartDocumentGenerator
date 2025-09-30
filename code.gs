/**
 * Pasang sebagai "On form submit" (installable trigger) pada spreadsheet yang terhubung Form.
 */
function onFormSubmit(e) {
  try {
    const named = e.namedValues; // nama kolom di tabel
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Spreadsheet 1'); // sesuaikan nama sheet
    const row = e.range ? e.range.getRow() : sheet.getLastRow();

    const TEMPLATE_ID = '<YOUR ID GOOGLE DRIVE FOLDER>'; // ganti
    const DEST_FOLDER_ID = '<YOUR ID DOCUMENT TEMPLATE>'; // ganti
    const LINK_COLUMN = 6; // nomor kolom tempat menyimpan link (ganti sesuai sheetmu)

    const folder = DriveApp.getFolderById(DEST_FOLDER_ID);
    const templateFile = DriveApp.getFileById(TEMPLATE_ID);

    // buat salinan template di folder tujuan
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
    const copyName = `Generated-${timestamp}`;
    const copyFile = templateFile.makeCopy(copyName, folder);
    const copyId = copyFile.getId();

    // buka doc salinan, ganti placeholder dengan nilai dari form
    const doc = DocumentApp.openById(copyId);
    const body = doc.getBody();
    for (let key in named) {
      const placeholder = `{{${key}}}`; // pastikan template menggunakan nama field persis sama
      const value = (named[key] && named[key][0]) ? named[key][0] : '';
      body.replaceText(placeholder, value);
    }
    doc.saveAndClose();

    // konversi ke PDF dan simpan
    const pdfBlob = DriveApp.getFileById(copyId).getAs(MimeType.PDF).setName(`${copyName}.pdf`);
    const pdfFile = folder.createFile(pdfBlob);

    // optional: hapus/move ke trash Google Doc intermediate
    DriveApp.getFileById(copyId).setTrashed(true);

    // buat share link (anyone with link can view) lalu ubah ke direct-download URL
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${pdfFile.getId()}`;

    // tulis link ke sheet pada baris submit yang sesuai
    sheet.getRange(row, LINK_COLUMN).setValue(downloadUrl);

    // optional: kirim email ke responden jika kamu punya field 'Email'
    if (named['Email klien'] && named['Email klien'][0]) {
      MailApp.sendEmail({
        to: named['Email klien'][0],
        subject: 'Perusahaan Kami',
        htmlBody: `
                <div>
                  <p>Kepada Yth. <b>${named['Nama klien'][0]}</b>,</p>

                  <p>Perkenalkan, kami dari <b>Perusahaan</b>, penyedia layanan digital profesional. 
                  Melalui email ini, kami ingin menawarkan jasa <b>Virtual Assistant</b> yang dapat membantu 
                  Anda dalam mengelola berbagai kebutuhan administrasi, komunikasi, dan pekerjaan rutin secara efisien.</p>

                  <p><b>Keunggulan layanan Virtual Assistant dari Meja Daring:</b></p>
                  <ul>
                    <li>Pengelolaan email, jadwal, dan dokumen secara profesional.</li>
                    <li>Dukungan komunikasi bisnis (chat, email, meeting online).</li>
                    <li>Pencatatan laporan dan data dengan rapi dan terstruktur.</li>
                    <li>Fleksibilitas layanan sesuai kebutuhan Anda.</li>
                  </ul>

                  <p>Untuk memberikan gambaran lebih jelas, kami telah menyiapkan dokumen penawaran resmi yang dapat Anda unduh melalui tautan berikut:</p>
                  <p><a href="${downloadUrl}" style="background: #0066cc; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">📥 Unduh Penawaran PDF</a></p>

                  <p>Dengan dukungan tim kami, Anda dapat lebih fokus pada hal-hal strategis, sementara pekerjaan rutin ditangani secara profesional.</p>

                  <p>Jika ada pertanyaan atau kebutuhan khusus, jangan ragu untuk membalas email ini atau menghubungi kami.</p>

                  <p>Hormat kami,<br><br>
                  <b>Tim Perusahaan kami</b><br>
                  Website: <a href="#">https://perusahaan-kami.com</a></p>
                </div>
              `
      });
    }

  } catch (err) {
    Logger.log('Error onFormSubmit: ' + err);
  }
}
