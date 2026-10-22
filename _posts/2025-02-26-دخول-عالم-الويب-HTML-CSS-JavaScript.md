---
title: "دخول عالم الويب: HTML و CSS و JavaScript — الثلاثي الذي يحكم الإنترنت"
date: 2025-02-26
description: "فهم بسيط لأهم ثلاث لغات في الويب — ما يعمل كل منها، وكيف تعمل معًا لتبني المواقع."
category: "برمجة"
tags: [HTML, CSS, JavaScript, ويب]
---

كل موقع تزوره — من Google إلى عالم تقني — مبني بثلاث لغات: **HTML، CSS، JavaScript**. لنفهمها معًا.

## تشبيه بسيط: بناء منزل

| اللغة | دورها | في المنزل |
|-------|-------|-----------|
| **HTML** | البنية | الجدران، السقف، الأبواب |
| **CSS** | الشكل | الطلاء، الديكور، الألوان |
| **JavaScript** | التفاعل | الكهرباء، الماء، الأبواب المفتوحة بجهاز تحكم |

بدون **HTML** — لا يوجد شيء.
بدون **CSS** — الموقع قبيح لكن يعمل.
بدون **JavaScript** — الموقع جامد، لا أزرار تعمل، لا حركة.

## HTML — الهيكل العظمي

**HTML** (HyperText Markup Language) يصف محتوى الصفحة.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي الأولى</title>
</head>
<body>
  <h1>مرحبًا بالعالم!</h1>
  <p>هذه أول فقرة في موقعي.</p>
  <a href="https://3alam-tech.netlify.app">عالم تقني</a>
  <img src="cat.jpg" alt="صورة قطة">
</body>
</html>
```

### أهم وسوم HTML

| الوسم | الوظيفة |
|------|---------|
| `<h1>` إلى `<h6>` | عناوين (من كبير لصغير) |
| `<p>` | فقرة |
| `<a>` | رابط |
| `<img>` | صورة |
| `<ul>`, `<li>` | قائمة |
| `<div>` | قسم منطقي |
| `<span>` | قسم صغير داخل سطر |
| `<button>` | زر |

## CSS — التنسيق والمظهر

**CSS** (Cascading Style Sheets) يجعل الموقع جميلًا.

```css
body {
  font-family: 'Cairo', sans-serif;
  background: #f0f4f8;
  color: #333;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  border-bottom: 3px solid #3498db;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}
```

### مفاهيم CSS مهمة

| المفهوم | ما يفعل |
|---------|---------|
| **selector** | يحدد العنصر (مثل `h1` أو `.class`) |
| **margin/padding** | المسافة خارج/داخل العنصر |
| **display** | كيف يعرض (`block`, `inline`, `flex`, `grid`) |
| **flexbox** | لتنسيق مرن — الأكثر استخدامًا |
| **media queries** | للاستجابة للشاشات المختلفة |

### Flexbox — الدرس الأهم

```css
.container {
  display: flex;
  justify-content: center; /* أفقي */
  align-items: center;    /* عمودي */
  gap: 20px;
}
```

Flexbox يجعل ترتيب العناصر سهلًا — كان كابوسًا قبل ظهوره.

## JavaScript — الحياة والتفاعل

**JavaScript** (JS) يجعل الموقع حيًا.

```javascript
// اختيار زر
const button = document.querySelector('button');
const counter = document.querySelector('#counter');

let count = 0;

// عند النقر
button.addEventListener('click', () => {
  count++;
  counter.textContent = `عدد النقرات: ${count}`;
});
```

### ما يستطيع JS فعله

- ✅ الاستجابة لأحداث المستخدم (نقر، كتابة، تمرير)
- ✅ تعديل محتوى الصفحة ديناميكيًا
- ✅ التواصل مع الخوادم (جلب بيانات)
- ✅ تخزين بيانات في المتصفح (localStorage)
- ✅ الرسم (Canvas، WebGL)
- ✅ أصبح حتى على الخوادم (Node.js)

### مثال: لعبة إكس-أو

في موقع عالم تقني، لعبة [إكس-أو](/projects/لعبة-إكس-أو/) مبنية بالكامل بـ JavaScript — من رسم اللوحة، لمنطق الفوز، للذكاء الاصطناعي للكمبيوتر.

## كيف تعمل الثلاثة معًا؟

```html
<!-- HTML: الهيكل -->
<div class="card">
  <h2>عنوان البطاقة</h2>
  <p>وصف البطاقة.</p>
  <button id="like-btn">إعجاب (0)</button>
</div>
```

```css
/* CSS: التنسيق */
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 300px;
  margin: 20px auto;
}

#like-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
}
```

```javascript
// JS: التفاعل
let likes = 0;
const btn = document.querySelector('#like-btn');

btn.addEventListener('click', () => {
  likes++;
  btn.textContent = `إعجاب (${likes})`;
});
```

النتيجة: بطاقة بها زر، كل نقر يزيد عدّاد الإعجابات.

## كيف تبدأ التعلّم؟

### مجانًا على الإنترنت

- [freeCodeCamp](https://www.freecodecamp.org/arabic/) — منهج كامل بالعربي
- [MDN Web Docs](https://developer.mozilla.org/ar/) — المرجع الأشمل
- [W3Schools](https://w3schools.com) — أمثلة تفاعلية

### على الهاتف

لا تحتاج حاسوبًا لتتعلّم! كل ما تحتاجه:

1. **متصفح** — للوصول لـ freeCodeCamp و MDN
2. **محرّر كود** — تطبيق **Spck Editor** (Android, iOS) — محرّر كود كامل على الهاتف
3. **CodePen** — [codepen.io](https://codepen.io) — اكتب HTML/CSS/JS مباشرة في المتصفح

### من يمنعك؟

في موقع عالم تقني، لدينا سلسلة شروحات:
- [مقدمة في HTML](/blog/مقدمة-في-HTML-للمبتدئين/)
- [أساسيات CSS](/blog/أساسيات-CSS-تنسيق-صفحات-الويب/)
- [تعلم JavaScript من الصفر](/blog/تعلم-JavaScript-من-الصفر/)

## ماذا بعد؟

بعد إتقان الأساسيات:

- **React / Vue** — أطر لبناء واجهات معقّدة
- **Node.js** — JavaScript على الخادم
- **Tailwind CSS** — إطار CSS سريع
- **TypeScript** — JavaScript بأنواع أأمن

لكن لا تتعجّل — أساسيات HTML و CSS و JS كافية لبناء مواقع رائعة.

## خلاصة

| اللغة | تتعلم منها | لبناء |
|-------|------------|-------|
| HTML | الوسوم، الهيكلة | الصفحات |
| CSS | الألوان، التخطيط | تصميم جميل |
| JavaScript | المنطق، الأحداث | تفاعل حقيقي |

ابدأ اليوم. اكتب أول صفحة HTML — 10 أسطر تكفي. التعلّم بالعمل، لا بالقراءة فقط. 🌐
