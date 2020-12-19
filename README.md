## Тестовое задание
Web приложение - терминал оплаты мобильного телефона.

В приложении должен быть:
1. Главный экран со списком операторов - МТС, Билайн, Мегафон.
2. Список должен быть расширяем.
3. По клику на оператора переходить на экран формы оплаты.
 3.1 Экран с формой оплаты должен содержать выбранного оператора
 3.2. Поле ввода телефона с маской и валидацией.
 3.3. Поле ввода суммы в рублях с маской и валидацией (мин 1 и макс 1000 руб)
 3.4. Кнопка подтверждения, которая ожидает ответа от сервера.

4. После ответа показывается сообщение об успехе или об ошибке. В случае успеха переходим на основной экран.

5. Стэк:
 5.1. TypeScript
 5.2. Next.js
 5.3. React и React Hooks
 5.4. Styled-Components

 6. верстка должна быть адаптивной и поддерживать различные размеры.

- Обращение к API должны быть эмулированы. Ответы должны быть успешные или неуспешные в случайном порядке.
- Дизайн и верстка на ваше усмотрение, но сделайте красиво и добавьте
анимации
экранов, включая мобильные.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
