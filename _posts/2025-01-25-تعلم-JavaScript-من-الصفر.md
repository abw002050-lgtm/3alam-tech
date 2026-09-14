---
title: "تعلّم JavaScript من الصفر"
date: 2025-01-25
description: "دليل عملي للمبتدئين لتعلم لغة JavaScript — المتغيّرات، الدوال، الشروط، الحلقات، وأكثر."
category: "برمجة"
tags: [JavaScript, برمجة, مبتدئين]
---

JavaScript هي لغة البرمجة الأشهر على الويب. بها تضيف التفاعل والحيوية إلى صفحاتك.

## لماذا JavaScript؟

- تعمل في **المتصفح مباشرة** — لا تحتاج تثبيت
- تُستخدم في **الواجهة والخادم** (Frontend + Backend)
- أكبر مجتمع برمجي في العالم
- مطلوبة في كل وظيفة تطوير ويب

## المتغيّرات

```javascript
// ثلاث طرق للتعريف
let name = "عاصم";      // متغيّر قابل للتغيير
const age = 25;          // ثابت لا يتغيّر
var old = "تجنّبها";     // طريقة قديمة — يُفضّل تجنّبها
```

> القاعدة الذهبية: استخدم `const` افتراضيًا، و `let` فقط عند الحاجة للتغيير.

## أنواع البيانات

| النوع | مثال |
|-------|------|
| String (نص) | `"مرحبًا"` |
| Number (رقم) | `42`, `3.14` |
| Boolean (منطقي) | `true`, `false` |
| Array (مصفوفة) | `[1, 2, 3]` |
| Object (كائن) | `{name: "عاصم"}` |

## الدوال (Functions)

```javascript
// الطريقة التقليدية
function greet(name) {
  return "مرحبًا " + name;
}

// الدالة السهمية (Arrow Function) — أحدث وأختصر
const greet = (name) => `مرحبًا ${name}`;

console.log(greet("عالم تقني")); // مرحبًا عالم تقني
```

## الشروط (Conditions)

```javascript
const hour = 14;

if (hour < 12) {
  console.log("صباح الخير");
} else if (hour < 18) {
  console.log("مساء الخير");
} else {
  console.log("ليلة هانئة");
}
```

## الحلقات (Loops)

```javascript
// طباعة الأرقام من 1 إلى 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// المرور على عناصر مصفوفة
const fruits = ["تفاح", "موز", "برتقال"];
fruits.forEach(fruit => console.log(fruit));
```

## التعامل مع DOM

DOM (Document Object Model) هو واجهة الوصول إلى عناصر HTML:

```javascript
// تغيير نص عنصر
const heading = document.querySelector("h1");
heading.textContent = "عالم تقني";

// إضافة حدث نقر
const button = document.querySelector("button");
button.addEventListener("click", () => {
  alert("ضغطت على الزر!");
});
```

## مشروع عملي صغير: حاسبة بسيطة

```javascript
function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "لا يمكن القسمة على صفر";
    default: return "عملية غير صحيحة";
  }
}

console.log(calculate(10, 3, "+")); // 13
console.log(calculate(10, 3, "/")); // 3.333...
```

## نصائح للتعلم

1. **اكتب الكود بيدك** — لا تنسخه فقط
2. **طبّق ما تتعلّمه فورًا** في مشاريع صغيرة
3. **اقرأ رسائل الخطأ (Error Messages)** — هي دليلك
4. **استخدم `console.log()` بكثرة** لتتبّع ما يحدث
5. **تعلم من المصادر الرسمية**: [MDN Web Docs](https://developer.mozilla.org/ar/docs/Web/JavaScript)

## مصادر مجانية للتعلّم

- [MDN JavaScript Guide](https://developer.mozilla.org/ar/docs/Web/JavaScript/Guide)
- [javascript.info](https://javascript.info)
- قناة YouTube: أكاديمية حسوب، Elzero Web School

التعلم رحلة، خطوة بخطوة تصل. 💡
