# jlpt-study-hub

## Giới thiệu
jlpt-study-hub là một ứng dụng web hỗ trợ học và luyện JLPT chạy hoàn toàn phía client. Dự án được xây dựng với Vue và không yêu cầu backend/server riêng. Toàn bộ phần “backend logic” (xử lý nghiệp vụ, validation, truy xuất dữ liệu, mô phỏng API, lưu tiến độ) được triển khai bằng TypeScript ngay trong ứng dụng.

## Mục tiêu
- Cung cấp một nơi tập trung để học và luyện JLPT theo cấp độ (N5–N1).
- Tối ưu trải nghiệm nhanh, đơn giản, có thể triển khai như một static site.
- Dễ mở rộng nội dung và logic học tập bằng các module TypeScript.

## Tính năng (tổng quan)
- Học theo cấp độ JLPT (N5–N4).
- Tìm kiếm và lọc nội dung theo nhiều tiêu chí.
- Luyện tập theo phiên và theo dõi tiến độ.
- Lưu trạng thái học tập trong trình duyệt (LocalStorage/IndexedDB tùy cách triển khai).
- Không phụ thuộc backend, có thể deploy lên GitHub Pages/Netlify/Vercel như một trang tĩnh.
- FlashCard

## Công nghệ sử dụng
- Vue (khuyến nghị Vue 3)
- TypeScript (đóng vai trò “backend logic” trong client)
- Tooling (thường là Vite; kiểm tra `package.json` để xác nhận)

## Yêu cầu hệ thống
- Node.js: khuyến nghị bản LTS (tối thiểu Node 18)
- npm (hoặc pnpm/yarn nếu dự án dùng thay thế)

## Cài đặt và chạy dự án

### 1) Clone repository
```bash
git clone https://github.com/RudeusGs/jlpt-study-hub.git
cd jlpt-study-hub
```

### 2) Cài dependencies
Nếu dùng npm:
```bash
npm install
```

Nếu dùng pnpm:
```bash
pnpm install
```

Nếu dùng yarn:
```bash
yarn
```

### 3) Chạy môi trường phát triển (hot reload)
```bash
npm run dev
```
Sau đó mở URL được in ra trên terminal (thường là `http://localhost:5173` nếu dùng Vite).

## Các lệnh hữu ích
Lưu ý: danh sách scripts có thể khác tùy dự án. Hãy kiểm tra `package.json` để xác nhận.

### Development
```bash
npm run dev
```

### Build production
```bash
npm run build
```

### Preview bản build trên local
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

### Format (nếu có cấu hình)
```bash
npm run format
```

### Test (nếu có cấu hình)
```bash
npm run test
```

## Kiến trúc dự án
Vì dự án không có backend, phần xử lý nghiệp vụ được tách rõ để dễ bảo trì:

- `src/services/`: lớp/hàm TypeScript xử lý nghiệp vụ (chấm điểm, chọn câu, thuật toán ôn tập, mapping dữ liệu)
- `src/data/`: dữ liệu tĩnh (JSON/TS constants) hoặc adapter đọc dữ liệu
- `src/stores/`: state management (Pinia hoặc lựa chọn khác)
- `src/features/` hoặc `src/modules/`: tổ chức theo domain (vocabulary, kanji, grammar, quiz, progress)
- `src/router/`: điều hướng (nếu có nhiều trang)
- `src/utils/`: helper thuần, hạn chế phụ thuộc UI

Mục tiêu tách bạch:
- UI (Vue components)
- State (stores)
- Business logic (TypeScript services)
- Data persistence (LocalStorage/IndexedDB adapters)


