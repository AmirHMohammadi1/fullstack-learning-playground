const express = require('express');
const router = express.Router();

// دیتابیس موقت (برای مثال)
let users = [
  { id: 1, name: 'علی محمدی', email: 'ali@example.com', age: 25 },
  { id: 2, name: 'فاطمه رضایی', email: 'fatemeh@example.com', age: 30 }
];

/**
 * @swagger
 * /users/users:
 *   get:
 *     summary: دریافت لیست تمام کاربران
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: لیست کاربران با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    total: users.length
  });
});

/**
 * @swagger
 * /users/users/{id}:
 *   get:
 *     summary: دریافت اطلاعات یک کاربر خاص
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه کاربر
 *     responses:
 *       200:
 *         description: اطلاعات کاربر با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: کاربر یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'کاربر یافت نشد',
      code: 404
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

/**
 * @swagger
 * /users/users:
 *   post:
 *     summary: ایجاد کاربر جدید
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: کاربر با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: داده‌های ورودی نامعتبر است
 */
router.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'نام و ایمیل اجباری هستند',
      code: 400
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    age: age || null
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'کاربر با موفقیت ایجاد شد'
  });
});

/**
 * @swagger
 * /users/users/{id}:
 *   put:
 *     summary: به‌روزرسانی اطلاعات کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: کاربر با موفقیت به‌روزرسانی شد
 *       404:
 *         description: کاربر یافت نشد
 */
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'کاربر یافت نشد',
      code: 404
    });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  
  res.json({
    success: true,
    data: users[userIndex],
    message: 'اطلاعات کاربر با موفقیت به‌روزرسانی شد'
  });
});

/**
 * @swagger
 * /users/users/{id}:
 *   delete:
 *     summary: حذف کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: کاربر با موفقیت حذف شد
 *       404:
 *         description: کاربر یافت نشد
 */
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'کاربر یافت نشد',
      code: 404
    });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedUser,
    message: 'کاربر با موفقیت حذف شد'
  });
});

module.exports = router;