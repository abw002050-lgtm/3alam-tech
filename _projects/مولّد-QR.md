---
layout: project
title: "مولّد رمز QR"
description: "أنشئ رموز QR احترافية لأي نص أو رابط — للواتساب، الواي-فاي، الروابط، والمزيد. مجاني وفوري."
icon: "fa-qrcode"
date: 2025-02-10
tags: [أداة, QR, رمز]
---
<p>اكتب أي نص أو رابط لإنشاء رمز QR قابل للمسح بالكاميرا. مثال: رابط واتساب، كلمة مرور واي-فاي، رابط موقع.</p>

<div id="qrgen">
  <div class="qr-controls">
    <input type="text" class="qr-input" placeholder="اكتب نصًا أو الصق رابطًا..." />
    <select class="qr-size">
      <option value="200x200">صغير (200px)</option>
      <option value="300x300" selected>متوسط (300px)</option>
      <option value="500x500">كبير (500px)</option>
    </select>
    <button class="btn btn-primary qr-btn"><i class="fa-solid fa-bolt"></i> إنشاء QR</button>
  </div>
  <div class="qr-result">
    <img class="qr-img" alt="رمز QR" style="display:none;max-width:100%;border-radius:12px;border:1px solid var(--border);" />
    <a class="btn btn-outline qr-download" style="display:none;margin-top:12px;" download="qrcode.png"><i class="fa-solid fa-download"></i> تحميل الصورة</a>
  </div>
</div>

<style>
.qr-controls { display: flex; flex-direction: column; gap: 12px; max-width: 420px; margin: 20px auto; }
.qr-input, .qr-size { padding: 12px 16px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-family: 'Cairo', sans-serif; font-size: .95rem; }
.qr-input:focus, .qr-size:focus { outline: none; border-color: var(--primary); }
.qr-result { text-align: center; margin-top: 24px; }
#qrgen .qr-btn { align-self: center; }
</style>

<script src="{{ site.baseurl }}/assets/js/tool-qr.js" defer></script>
