# Fullstack Learning Playground 🚀

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql)](https://graphql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?logo=express)](https://expressjs.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger)](https://swagger.io/)
[![Multer](https://img.shields.io/badge/Multer-1.4+-FF6F61?logo=)](https://github.com/expressjs/multer)

یک مجموعه جامع و در حال رشد از پروژه‌های فول‌استک که به عنوان بستری برای یادگیری، آزمایش و تسلط بر تکنولوژی‌های مدرن توسعه وب ایجاد شده است.

> **🎯 هدف اصلی:** این ریپوزیتوری یک آزمایشگاه آموزشی است که در آن مفاهیم مختلف به صورت عملی، در قالب کامیت‌های کوچک و مستقل پیاده‌سازی و تست می‌شوند.

## 📚 فهرست مطالب

- [بررسی کلی](#بررسی-کلی)
- [ساختار پروژه](#-ساختار-پروژه)
- [پروژه‌ها](#-پروژهها)
- [تکنولوژی‌ها](#-تکنولوژیها)
- [راه‌اندازی و نصب](#-راهاندازی-و-نصب)
- [مسیر توسعه آینده](#-مسیر-توسعه-آینده)
- [مشارکت](#-مشارکت)
- [مجوز](#-مجوز)

## بررسی کلی

این ریپوزیتوری شامل چندین پروژه مستقل اما مرتبط است که هر کدام بر روی یک تکنولوژی یا مفهوم خاص تمرکز دارند. هدف اصلی، ایجاد محیطی برای:

- ✅ **یادگیری عملی** تکنولوژی‌های مدرن
- 🔬 **آزمایش و تست** کتابخانه‌ها و فریم‌ورک‌های جدید
- 📖 **مستندسازی** مراحل یادگیری برای دیگران
- 🎯 **ایجاد نمونه کد** برای مرجع آینده

## 🗂 ساختار پروژه

```
mini-fullstack-todo-graphQl/
│
├── 📁 graphql/                 # پروژه سرور GraphQL
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── 📁 typescript/              # پروژه React با TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── 📁 todo-app/                # برنامه کامل Todo (فول‌استک)
│   │
│   ├── 📁 ui/                  # رابط کاربری فرانت‌اند
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── 📁 api/                 # سرور بک‌اند
│       ├── 📁 routes/
│       │   ├── users/          # مسیر کاربران با Swagger
│       │   └── upload/         # مسیر آپلود با Multer
│       ├── 📁 database/        # پیاده‌سازی‌های دیتابیس
│       ├── server.js
│       └── package.json
│
├── 📁 docs/                    # مستندات پروژه
├── .gitignore
└── README.md
```

## 🚀 پروژه‌ها

### 1. [`/graphql`](graphql/) - سرور GraphQL آموزشی 🎯

**هدف:** یادگیری مفاهیم پایه و پیشرفته GraphQL

```bash
cd graphql
npm install
npm start
```

**ویژگی‌ها:**
- ✨ پیاده‌سازی Schema و Resolver
- 🔄 پیکربندی Query و Mutation
- 🛡 مدیریت خطا و Validation
- 📊 integration با پایگاه داده

**مفاهیم آموزشی:**
- تفاوت‌های REST vs GraphQL
- طراحی Type System
- Optimistic Updates
- Caching Strategies

### 2. [`/typescript`](typescript/) - React 18 با TypeScript ⚡

**هدف:** تسلط بر Integration بین React و TypeScript

```bash
cd typescript
npm install
npm run dev
```

**ویژگی‌ها:**
- 🎯 TypeScript Configuration بهینه
- 📝 Typing برای Components و Hooks
- 🎨 Strict Type Checking
- 🔧 Custom Hooks با Type Safety

**مفاهیم آموزشی:**
- Interface و Type Aliases
- Generic Components
- Type Guards
- Advanced Type Patterns

### 3. [`/todo-app`](todo-app/) - برنامه Todo فول‌استک 📝

یک برنامه کامل مدیریت وظایف که از معماری جداگانه برای frontend و backend استفاده می‌کند.

#### فرانت‌اند ([`/ui`](todo-app/ui/))
```bash
cd todo-app/ui
npm install
npm start
```

**ویژگی‌های UI:**
- 🎨 رابط کاربری مدرن و Responsive
- 📱 طراحی Mobile-First
- ⚡ State Management پیشرفته
- 🎯 Drag & Drop functionality

#### بک‌اند ([`/api`](todo-app/api/))
```bash
cd todo-app/api
npm install
npm run dev
```

**ماژول‌های بک‌اند:**

##### 🗃 **API ساده (بدون دیتابیس)**
- پیاده‌سازی CRUD Operations
- در-memory Data Storage
- مناسب برای نمونه‌سازی سریع

##### 🗄 **API با دیتابیس**
- اتصال به Database (MongoDB/PostgreSQL)
- Migration و Seed Data
- Query Optimization

##### 👥 **Route `/user`** (با Swagger)
```javascript
// مثال از endpoint کاربران
GET /api/users     // دریافت لیست کاربران
POST /api/users    // ایجاد کاربر جدید
PUT /api/users/:id // به‌روزرسانی کاربر
```

**مستندسازی Swagger:**
- 📚 Documentation خودکار
- 🧪 Test Interface تعاملی
- 🔒 Authentication Schemes

##### 📁 **Route `/upload`** (با Multer)
```javascript
// پیکربندی Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
```

**ویژگی‌های آپلود:**
- 🖼 پشتیبانی از Multiple File Upload
- 📏 File Size Limitation
- 🎯 File Type Validation
- ☁️ Integration با Cloud Storage

## 🛠 تکنولوژی‌ها

### فرانت‌اند
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

### بک‌اند
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

### ابزارها و کتابخانه‌ها
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-1.4.4-FF6F61?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### توسعه و Deployment
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## 🚀 راه‌اندازی و نصب

### پیش‌نیازها
- Node.js (نسخه 18 یا بالاتر)
- npm یا yarn
- Git

### راه‌اندازی کلی
```bash
# کلون کردن ریپوزیتوری
git clone https://github.com/AmirHMohammadi1/mini-fullstack-todo-graphQl.git
cd mini-fullstack-todo-graphQl

# نصب وابستگی‌ها برای هر پروژه
cd graphql && npm install && cd ..
cd typescript && npm install && cd ..
cd todo-app/ui && npm install && cd ../..
cd todo-app/api && npm install && cd ../..
```

### اجرای پروژه‌ها

#### سرور GraphQL
```bash
cd graphql
npm start
# درگاه: http://localhost:4000/graphql
```

#### پروژه TypeScript
```bash
cd typescript
npm run dev
# درگاه: http://localhost:3000
```

#### برنامه Todo
```bash
# اجرای بک‌اند
cd todo-app/api
npm run dev
# درگاه: http://localhost:5000

# اجرای فرانت‌اند (در ترمینال جداگانه)
cd todo-app/ui
npm start
# درگاه: http://localhost:3001
```

## 📈 مسیر توسعه آینده

### 🎯 کامیت‌های برنامه‌ریزی شده
- [ ] **آتی‌۱:** اضافه کردن Authentication با JWT
- [ ] **آتی‌۲:** پیاده‌سازی Real-time با Socket.io
- [ ] **آتی‌۳:** اضافه کردن Testing (Jest, Cypress)
- [ ] **آتی‌۴:** Dockerize کردن پروژه‌ها
- [ ] **آتی‌۵:** پیاده‌سازی CI/CD Pipeline

### 🔮 تکنولوژی‌های در دست بررسی
- **tRPC** برای End-to-End Typesafe APIs
- **Prisma** برای Database ORM
- **Next.js** برای Server-Side Rendering
- **Tailwind CSS** برای Styling
- **Redis** برای Caching
- **WebSockets** برای Real-time Features

## 🤝 مشارکت

این ریپوزیتوری با هدف آموزشی ایجاد شده و مشارکت‌های شما می‌تواند آن را غنی‌تر کند!

### راه‌های مشارکت:
1. **گزارش باگ** 🐛: اگر مشکل فنی مشاهده کردید
2. **پیشنهاد feature** 💡: ایده‌های جدید برای یادگیری
3. **ارسال Pull Request** 🔄: پیاده‌سازی improvements
4. **بهبود مستندات** 📖: واضح‌تر کردن توضیحات

### دستورالعمل مشارکت:
```bash
# فورک کردن ریپوزیتوری
# ایجاد برنچ جدید
git checkout -b feature/amazing-feature

# کامیت تغییرات
git commit -m 'Add some amazing feature'

# Push به برنچ
git push origin feature/amazing-feature

# ایجاد Pull Request
```



---

## 📞 تماس با من

**امیرحسین محمدی**
- 📧 Email: [a.h.mohammadi5@gmail.com](mailto:a.h.mohammadi5@gmail.com)
- 💼 LinkedIn: [AmirHossein Mohammadi](https://linkedin.com/in/amirhmohammadi)
- 🐙 GitHub: [@AmirHMohammadi1](https://github.com/AmirHMohammadi1)

---

<div align="center">

**ساخته شده با ❤️ و کافی‌های بی‌شمار ☕**

*اگر این پروژه برای شما مفید بود، حتماً ⭐ ستاره بدید تا انگیزه‌مون بیشتر بشه!*

</div>
