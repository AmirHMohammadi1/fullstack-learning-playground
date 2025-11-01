const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'یک API ساده برای مدیریت کاربران با مستندات Swagger',
    contact: {
      name: 'تیم پشتیبانی',
      email: 'support@example.com'
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'سرور توسعه'
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          id: {
            type: 'integer',
            description: 'شناسه یکتای کاربر'
          },
          name: {
            type: 'string',
            description: 'نام کامل کاربر'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'آدرس ایمیل کاربر'
          },
          age: {
            type: 'integer',
            minimum: 0,
            description: 'سن کاربر'
          }
        },
        example: {
          id: 1,
          name: 'علی محمدی',
          email: 'ali@example.com',
          age: 25
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'پیغام خطا'
          },
          code: {
            type: 'integer',
            description: 'کد خطا'
          }
        }
      }
    }
  }
};

module.exports = swaggerDefinition;