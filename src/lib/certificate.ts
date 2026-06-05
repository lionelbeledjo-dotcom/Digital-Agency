export function generateCertificateHTML(data: {
  prenom: string;
  nom: string;
  formation: string;
  date: string;
  certificateId: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; background: #fff; }
    .cert { width: 800px; height: 566px; margin: 0 auto; padding: 40px; border: 3px solid #1a5c3a; position: relative; }
    .cert::before { content: ''; position: absolute; inset: 8px; border: 1px solid #c8a415; }
    .header { text-align: center; margin-top: 20px; }
    .logo { font-size: 18px; font-weight: bold; color: #1a5c3a; letter-spacing: 2px; }
    .title { font-size: 32px; color: #1a5c3a; margin-top: 20px; font-style: italic; }
    .subtitle { font-size: 14px; color: #666; margin-top: 8px; text-transform: uppercase; letter-spacing: 3px; }
    .name { font-size: 36px; color: #1a1a1a; margin-top: 30px; text-align: center; font-weight: bold; border-bottom: 2px solid #c8a415; display: inline-block; padding-bottom: 5px; }
    .name-wrap { text-align: center; margin-top: 30px; }
    .formation { font-size: 16px; color: #333; margin-top: 25px; text-align: center; }
    .formation strong { color: #1a5c3a; }
    .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding: 0 20px; }
    .footer-item { text-align: center; }
    .footer-item .line { width: 150px; border-top: 1px solid #999; margin-bottom: 5px; }
    .footer-item .label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
    .id { position: absolute; bottom: 15px; right: 20px; font-size: 9px; color: #999; }
    .badge { display: inline-block; background: #1a5c3a; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 11px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="header">
      <div class="logo">DIGITAL AGENCY</div>
      <span class="badge">Certificat de réussite</span>
      <h1 class="title">Certificat de Formation</h1>
      <p class="subtitle">Décerné avec honneur</p>
    </div>
    <div class="name-wrap">
      <div class="name">${data.prenom} ${data.nom}</div>
    </div>
    <p class="formation">A complété avec succès la formation<br><strong>"${data.formation}"</strong></p>
    <div class="footer">
      <div class="footer-item">
        <div class="line"></div>
        <div class="label">Date : ${data.date}</div>
      </div>
      <div class="footer-item">
        <div class="line"></div>
        <div class="label">Digital Agency</div>
      </div>
    </div>
    <div class="id">ID: ${data.certificateId}</div>
  </div>
</body>
</html>`;
}

export function downloadCertificate(data: {
  prenom: string;
  nom: string;
  formation: string;
  date: string;
  certificateId: string;
}) {
  const html = generateCertificateHTML(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url, "_blank");
  if (printWindow) {
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }
}
